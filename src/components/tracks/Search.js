import React, { Component } from 'react'
import axios from 'axios'
import { Consumer } from '../../context'
 class Search extends Component {
    state ={
        trackTitle: ''
    }

     findTrack = (dispatch, e) => {
       
        e.preventDefault();
        
        axios.get( `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
       .then(res => {
                     dispatch({
                         type: 'SEARCH_TRACKS',
                         payload: res.data.message.body.track_list
                     });
                      
                     this.setState({trackTitle: ''});

                   })
      .catch(err => console.log(err));
    };
    onChange = (e) =>{
           this.setState({[ e.target.name ] : e.target.value})
    }
    
    render() {
        return (
            <Consumer>
                { value =>{
                    const { dispatch } = value;
                   return (
                   
                    <div className="card card-image mb-4 cover">

                    
                        
                      <div className="card-body mb-4 p4">
                          <h2 className="text-center">
                              <i className="fas fa-music"></i> Search For A Song
                          </h2>
                          <p className="lead text-center quote"> Get the lyrics for any song</p>
                          <form onSubmit={this.findTrack.bind(this ,dispatch)}>
                              <div className="form-group">
                                  <input type="text" className="form-control form-control-lg" 
                                  placeholder="Type to search ..." name="trackTitle" 
                                  value={this.state.trackTitle} onChange={this.onChange}/>
                              </div>
                              <button className="btn btn-dark purple-gradient btn-lg btn-block mb-5" type="submit">
                              <i className="fas fa-search"></i> Get Track Lyrics
                              </button>
                          </form>
                      </div> 
                      </div>
                   );
                }}
            </Consumer>
        )
    }
}

export default Search;