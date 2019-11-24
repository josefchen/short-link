import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            copied: false
        };
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);
       this.clipboard.on('success', () => {
        this.setState({
            copied: true
        });
        setTimeout(() => {
            this.setState({
                copied: false
            });            
        }, 2000)
       }).on('error', () => {
           throw new Meteor.error('something went wrong', 'Link not copied');
           alert('Copy failed, please manually copy');
       })
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }
    
    toggleVisibility() {
        Meteor.call('links.setVisibility',this.props._id,!this.props.visible)
        console.log('setting visibility');
    }

    renderStats() {
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let visitedMessage = null;

        if(typeof this.props.lastVisited === 'number') {
            visitedMessage = `(last visited ${moment(this.props.lastVisited).fromNow()})`;
        }
        return <p class="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>;
        
    }

    render() {
        return (
            <div class="item">
                <h2>{this.props.url}</h2>
                <p class="item__message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <p class="item__message">Added: {moment(this.props.addedDate).format('llll')}</p>
                <a class="button button--pill button--link" href={this.props.shortUrl} target="_blank">
                    Visit
                </a>
                <button class="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.copied ? 'Copied' : 'Copy'}</button>
                <button class="button button--pill" onClick={this.toggleVisibility.bind(this)}>{this.props.visible ? 'Hide' : 'Show'}</button>
            </div>
        )
    }
}
