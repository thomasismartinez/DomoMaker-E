const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleDomo = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const color = e.target.querySelector('#domoColor').value;
    const age = e.target.querySelector('#domoAge').value;

    if(!name || !color || !age) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, color, age}, () => { loadDomosFromServer(name) } );

    return false;
};

const DomoForm = (props) => {
    return (
        <div>
            <h2>Create Your Own Domo</h2>
            <form id="domoForm"
                onSubmit={handleDomo}
                name="domoForm"
                action="/maker"
                method="POST"
                className="domoForm"
            >
                <label htmlFor='name'>Name</label>
                <input id='domoName' type='text' name='name' placeholder='Domo Name'/>
                <label htmlFor='color'>Color</label>
                <input id='domoColor' type='text' name='color' placeholder='Domo Color'/>
                <label htmlFor='age'>Age</label>
                <input id='domoAge' type='number' min='0' name='age'/>
                <input className='makeDomoSubmit' type='submit' value='Make Domo'/>
            </form>
        </div>
    );
};

const UserForm = (props) => {
    return (
        <div>
            <h2>See Other User's Collection</h2>
            <form id="usersForm"
                onSubmit={handleUser}
                name="usersForm"
                action="/getUser"
                method="GET"
                className="domoForm"
            >
                <label id='userFormLabel' htmlFor='name'>User Name</label>
                <input id='userName' type='text' name='name' placeholder='User Name'/>
                <input className='makeDomoSubmit' type='submit' value='Search User'/>
            </form>
        </div>
    );
};

const handleUser = (e) => {
    console.log('entering maker.jsx > handleUser')
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#userName').value;

    if(!name) {
        helper.handleError('Name field required!');
        return false;
    }

    loadDomosFromServer(name)

    return false;
}

const DomoList = (props) => {
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
                <h3 className='domoColor'> Color:  {domo.color}</h3>
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

const loadDomosFromServer = async (name) => {
    console.log('loading domos from server');

    const response = await fetch('/getDomos?' + new URLSearchParams({
        username: name,
    }));
    const data = await response.json();
    ReactDOM.render(
        <DomoList domos={data.domos}/>,
        document.getElementById('domos')
    );
};

const init = () => {
    console.log('entering maker.jsx > init()')
    ReactDOM.render(
        <DomoForm/>,
        document.getElementById('makeDomo')
    );

    ReactDOM.render(
        <UserForm/>,
        document.getElementById('findUser')
    );

    ReactDOM.render(
        <DomoList domos={[]} />,
        document.getElementById('domos')
    );

    loadDomosFromServer();

    window.onload = init;
}

window.onload = init;