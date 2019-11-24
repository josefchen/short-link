import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends Component {
    constructor(props){
        super(props);
        this.renderLinksListItems.bind(this);
        this.state = {
            links: []
        }
    }

    renderLinksListItems() {
        if (this.state.links.length === 0) {
            return (<div class="item">
                <p class="item__message item__warning">No links found.</p>
            </div>)
        }

        return this.state.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
            // const redirectUrl = `http://localhost:3000/${link._id}`;
            // return <p key={link._id}>{link.url} = <a href={redirectUrl}>http://localhost:3000/{link._id}</a></p> 
        })
    }

    componentDidMount() {
        this.linksTracker = Tracker.autorun(()=> {
            Meteor.subscribe('links');
            const links = Links.find(
                {visible: Session.get('showVisible')}
            ).fetch();
            this.setState({
                links: links
            })
        })
}
    
    componentWillUnmount() {
        console.log('unmounted');
        this.linksTracker.stop();
    }

    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                {this.renderLinksListItems()}
                </FlipMove>
            </div>
        )
    }
}
