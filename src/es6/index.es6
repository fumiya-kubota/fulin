import React from 'react'
import ReactDOM from 'react-dom'
import CodeMirror from 'react-codemirror'
import Errors from './components/errors'
import 'codemirror/addon/display/placeholder'


const style = {
  margin: 12,
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: []
        }
        this.displayName = 'App'
        this.options = {
            lineNumbers: true,
            placeholder: "チェックしたいテキストを入力してください。"
        }
        this.onClick = this.onClick.bind(this)
        this.onChange = this.onChange.bind(this)
        this.value = ''
    }

    onChange(value) {
        this.value = value
    }

    onClick(e) {
        if (this.value) {
            const request = new XMLHttpRequest()
            request.onreadystatechange = (e) => {
                const req = e.currentTarget
                if(req.readyState == 4) {
                    if(req.status == 200 || req.status == 201) {
                        this.setState({
                            errors: JSON.parse(req.response)
                        })
                    }
                }
            }
            request.open('POST', 'check')
            request.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
            request.send(this.value)
        }
    }

    render() {
        return (
            <div>
                <CodeMirror ref="editor" onChange={this.onChange} options={this.options} />
                <button id="check" type="button" onClick={this.onClick}>CHECK</button>
                <Errors errors={this.state.errors} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('main')
)