import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            error: '',
            url: '',
            isOpen: false
        }
    }

    onChange(e) {
        this.setState({url: e.target.value.trim()});

    }

    onSubmit(e) {
        e.preventDefault();
        let url = this.state.url.trim();
        

        if (url) {
            if (!url.startsWith("https://") && !url.startsWith("http://")) {
                url = "http://" + url
                this.setState({
                    isOpen: false
                })
            }
            
            
            Meteor.call('links.insert',url, (err, res) => {
                if(!err) {
                this.closeModal  
                } else if (err) {
                    this.setState({
                        error: err.reason
                    })
                }
            });

        } else {
            this.setState({
                error: 'URL cannot be empty.'
            })
        }
    }

    closeModal() {
        this.setState({isOpen: false, url: '', error: ''});
    }

    render() {
        return (
            <div>
                <button class="button" onClick={() => {this.setState({isOpen: true})}}>+ Add link</button>
                <Modal
                isOpen={this.state.isOpen}
                contentLabel='Add link'
                onAfterOpen={() => {this.refs.url.focus()}}
                ariaHideApp={false}
                onRequestClose={this.closeModal}
                className="boxed-view__box"
                overlayClassName="boxed-view  boxed-view--modal"
                >
                    
                    <h1>Add link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form class="boxed-view__form" onSubmit={this.onSubmit}>
                        <input type="text" ref="url" placeholder="URL" value={this.state.url} onChange={this.onChange.bind(this)}/>
                        <button class="button">Add Link</button>                    
                        <button type="button" class="button button--secondary" onClick={this.closeModal}>Cancel</button>
                    </form>

                </Modal>



            </div>
        )
    }
}
