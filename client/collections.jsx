const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleUsers = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;

    if(!name || !age) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, age}, loadDomosFromServer);

    return false;
};

const UserForm = (props) => {
    return (
        <form id="usersForm"
            onSubmit={handleUsers}
            name="usersForm"
            action="/getUsers"
            method="GET"
            className="usersForm"
        >
            <label htmlFor='name'>Name</label>
            <input id='userName' type='text' name='name' placeholder='User Name'/>
            <input className='makeDomoSubmit' type='submit' value='Search User'/>
        </form>
    );
};

const UsersList = (props) => {
    console.log(props);
    if(props.domos.length === 0) {
        return (
            <div className='domoList'>
                <h3 className='emptyDomo'>No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => {
        return (
            <div key={domo._id} className='domo'>
                <img src='/assets/img/domoface.jpeg' alt='domo face' className='domoFace'/>
                <h3 className='domoName'> Name:  {domo.name}</h3>
                <h3 className='domoAge'> Age:  {domo.age}</h3>
            </div>
        );
    });

    return (
        <div className='domoList'>
            {domoNodes}
        </div>
    )
};

const loadUsersFromServer = async () => {
    console.log('loading users from server');
    const response = await fetch('/getUsers');
    const data = await response.json();
    ReactDOM.render(
        <UsersList users={data.users}/>,
        document.getElementById('users')
    );
};

const init = () => {
    console.log('entering collections.jsx > init()')
    ReactDOM.render(
        <UsersForm/>,
        document.getElementById('searchUsers')
    );

    ReactDOM.render(
        <UsersList users={[]} />,
        document.getElementById('users')
    );

    loadDomosFromServer();

    window.onload = init;
}

window.onload = init;