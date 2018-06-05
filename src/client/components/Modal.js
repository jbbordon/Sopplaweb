import React, { Component } from 'react';
import '../style/modal.css';

class Modal extends Component {
  constructor () {
    super();
    this.state = {
      title : "",
      scenarioList: []
    }
  }
  render () {
    return (
      <!-- Modal -->
      <div className="modal fade" id="basicModal" tabindex="-1" role="dialog" aria-labelledby="basicModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="basicModalLabel">Scenario Load</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Scenario : { this.state.title }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
