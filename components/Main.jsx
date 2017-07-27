var React = require('react');

module.exports = class Main extends React.Component{

    render() {
        return (
            <html>
                <head>
                    <title>Universal App with React</title>
                    <link rel='stylesheet' href='/style.css' />
                </head>
                <body>
                    <div>
                        <h1>YEAH!</h1>
                        <button onClick={this._handleClick}>Click Me</button>
                    </div>
                </body>
            </html>
        );
    }
};