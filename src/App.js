import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {

  const edits = document.getElementsByClassName('editUser');

  for (let i = 0; i < edits.length; i++) {
    const element = edits[i];
    console.log(element)
  }
  const [users, setUsers] = useState([])
  const [userToEdit, setUserToEdit] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const submitName = () => {
    let tBody = document.getElementById('t-body');
    let username = document.getElementById('username').value;
    let UserId = tBody.lastChild ? tBody.lastChild.firstChild.innerText : 0;
    let user = {
      id: parseInt(UserId) + 1,
      username: username,
    }
    users.push(user);
    reRenderUsers();
    document.getElementById('username').value = ''
  }

  const reRenderUsers = () => {
    let tBody = document.getElementById('t-body');
    tBody.innerHTML = ''
    users.forEach((user) => {
      let tr = document.createElement('tr');
      // tr.innerHTML = '<td>'+parseInt(user.id)+'</td><td>'+user.username+'</td><td><button className="editUser btn btn-primary">Edit</button><button className="btn btn-danger">Delete</button></td>';
      let tdId = document.createElement('td');
      tdId.innerText = parseInt(user.id);
      let tdName = document.createElement('td');
      tdName.innerText = user.username;
      let tdActions = document.createElement('td');
      let actionEdit = document.createElement('button');
      actionEdit.innerText = 'Edit'
      actionEdit.classList.add('btn')
      actionEdit.classList.add('btn-primary')
      actionEdit.addEventListener('click', function (event) {
        event.preventDefault();
        setIsEdit(true);
        let userId = this.parentElement.parentElement.firstChild.innerText;
        const u = users.find(e => e.id == userId)
        document.getElementById('username').value = u.username;
        document.getElementById('userId').value = u.id;
      })
      let actionDelete = document.createElement('button');
      actionDelete.innerText = 'Delete'
      actionDelete.classList.add('btn')
      actionDelete.classList.add('btn-danger')
      actionDelete.addEventListener('click', function (event) {
        event.preventDefault();
        let userId = this.parentElement.parentElement.firstChild.innerText;
        
        
        let b = users.filter((e) => {
          return e.id == userId
        })
        let newUsers = b.splice(0,1);
        setUsers(newUsers);
        reRenderUsers();
      })
      tdActions.appendChild(actionEdit)
      tdActions.appendChild(actionDelete)
      tr.appendChild(tdId);
      tr.appendChild(tdName);
      tr.appendChild(tdActions);
      tBody.appendChild(tr);
    })
  }

  const updateUser = () => {
    let username = document.getElementById('username').value;
    let id = document.getElementById('userId').value;
    console.log(id, username)
    users.forEach((user) => {
      if (user.id == id) {
        user.username = username;
      }
    })
    setUsers(users);
    reRenderUsers()
    setIsEdit(false);
  }

  return (
    <section className='container'>
      <div className='row my-5'>
        <div className='col-lg-4 col-md-8 col-sm-8'>
          <input type={'hidden'} id='userId' />
          <input type={'text'} className='form-control mb-md-3'
            placeholder='Enter your name' id='username' />
        </div>
        <div className='col-lg-2 col-md-2 col-sm-2'>
          <button className='btn btn-primary'
            onClick={() => !isEdit ? submitName() : updateUser()}>Save</button>
        </div>
      </div>
      <div className='row my-5'>
        <div className='col-lg-6 col-md-12 col-sm-12'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody id="t-body">
              <tr className='d-none'>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default App;
