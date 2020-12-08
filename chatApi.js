class ChatApiService {
  constructor() {
    this.mainUrl = 'https://jslabdb.datamola.com';
    this.urlGetMesseges = 'https://jslabdb.datamola.com/messages';
    this.urlGetUsers = 'https://jslabdb.datamola.com/users';
    this.urlRegister = 'https://jslabdb.datamola.com/auth/register';
    this.urlLogin = 'https://jslabdb.datamola.com/auth/login';
    this.urlLogOut = 'https://jslabdb.datamola.com/auth/logout';
  }

  async getUsers() {
    try {
      let response = await fetch(this.urlGetUsers);
      let users = await response.json();
      this.users = users;
      return users;
    } catch (error) {
      return alert(error);
    }
  }

  async getMesseges(skip, params) {
    try {
      let response = await fetch(`${this.urlGetMesseges}?skip=0&top=${skip}&${new URLSearchParams(params)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: 'Bearer ' + localStorage.getItem('curUserToken')
        }
      });
      const messages = await response.json();
      return messages;
    } catch (error) {
      return alert(error);
    }
  }

  async postMsg(body) {
    try {
      let response = await fetch(this.urlGetMesseges, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: 'Bearer ' + localStorage.getItem('curUserToken')
        },
        body: JSON.stringify(body)
      });
    } catch (error) {
      console.log(error);
    }
  }

  async editMsg(id, body) {
    try {
      let response = await fetch(`${this.urlGetMesseges}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: 'Bearer ' + localStorage.getItem('curUserToken')
        },
        body: JSON.stringify(body)
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMsg(id) {
    try {
      let response = await fetch(`${this.urlGetMesseges}/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('curUserToken')
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async logOut() {
    try {
      let response = await fetch(this.urlLogOut, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: 'Bearer ' + localStorage.getItem('curUserToken')
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  // async filter(skip, obj) {
  //   try {
  //     let response = await fetch(`${this.urlGetMesseges}?skip=0&top=${skip}?${new URLSearchParams(obj)}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8',
  //         authorization: 'Bearer ' + localStorage.getItem('curUserToken')
  //       }
  //     }).then(data=> data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

// fetch(`${url}?${new URLSearchParams(params)}`, {
//   method: "GET",
//   headers: {
//     // "Content-Type": "application/json;charset=utf-8",
//     //"authorization": "Bearer " + this.token
//   },
// })
//   .then((data) => {
//     return data.json();
//   })
//   .then((data) => {
//     document.querySelector("#joke").innerHTML = data.value.joke;
//     this.jokeTimeout = setTimeout(() => {
//       this.getJoke();
//     }, 10000);
//   });
// }
