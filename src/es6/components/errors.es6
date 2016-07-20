import React from 'react'

class Errors extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'Errors'
    }
    render() {
        return (
            <table>
            <thead>
                <tr>
                <th className="lines">行数</th>
                <th className="message">エラー内容</th>
                </tr>
            </thead>
            <tbody>
            {this.props.errors.map((error, index) => {
                return (
                    <tr key={index}>
                        <td>{`${error.line}行目`}</td>
                        <td>{error.message}</td>
                    </tr>
                )
            })}
            </tbody>
            </table>
        )
    }
}

export default Errors
