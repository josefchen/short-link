import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

export default class LinksListFilters extends Component {
    constructor(props) {
        super(props);
        this.onChange.bind(this);

        this.state = {
            error: '',
            showVisible: true
        }
    }

    onChange(e) {
        Session.set('showVisible', !e.target.checked)
    }

    componentDidMount() {
        this.visibleTracker = Tracker.autorun(() => {
            const showVisible = Session.get('showVisible');
            this.setState({
                showVisible: showVisible
         })
        })


    }
    
    componentWillUnmount() {
        this.visibleTracker.stop()
    }

    render() {
        return (
            <div>
                <label class="checkbox">
                <input class="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={this.onChange}/>
                Show hidden links
                </label>
            </div>
        )
    }
}
