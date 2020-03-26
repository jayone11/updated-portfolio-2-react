import React from 'react';
import './App.css';
import './skeleton.css';
import Img from 'react-image';
// import './src/components/typewrite/typewrite.js';
import Particles from 'react-particles-js';
// import $ from 'jquery';
// window.$ = $;
// import './js/index';

function App() {
  return (
    <div>    
  <Particles 
    params={{
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
            					blur: 5
            				}
            			}
            		}
            	}}
              style={{
                width: '100%'
                // backgroundImage: `url(${logo})` 
    }}
  />

    <div className="container">
      <div className="row top">
          <div className="twelve columns">
            <h1 className="title-name">Jeff Barroso</h1>
            <h2>Software Engineering</h2>
            <div className="py-5">
              <div className="output" id="output">
                <h1 className="cursor"> </h1>
                <p></p>
              </div>
            </div>
            <br/>
          </div>
      </div>  

      {/* <Typewrite /> */}
      
      <div className="container content">
        <h2>Portfolio</h2>
        <br/>
        {/* <!-- Laptop --> */}
        <div className="row">
            <div className="twelve columns">
              <div className="laptop">
                <div className="trim">
                  <iframe title="iframe" id="laptop" src="https://jayone11.github.io/password-generator/">
                  </iframe>
                </div>
              </div>
            </div>
            
            <div className="eight columns">
              <div className="info">
              <a href="https://www.google.com" className="p-links">Password Generator</a>
              <div className="techs-used">
                <a href="https://github.com/jayone11/password-generator"><i className="fa fa-github fa-3x"></i></a>
                <i className="fa fa-html5 fa-3x"></i>
                <i className="fa fa-css3 fa-3x"></i>
                <Img id="jsIcon" src="./assets/images/js-brands.svg" alt="js icon"/>
              </div>

              <p>This is a password generator application built while I attended the UCLA Extension coding bootcamp.</p>
      </div></div>
            
        </div>
        {/* <!-- Laptop --> */}
        <div className="row">
          <div className="twelve columns">
            <div className="laptop">
              <div className="trim">
                <iframe title="iframe" id="laptop" src="https://jayone11.github.io/Weather-Dashboard/">
                </iframe>
              </div>
            </div>
          </div>
            

            <div className="eight columns info">
                <a href="https://www.google.com" className="p-links">Weather Dashboard Application</a>
                <div className="techs-used">
                  <i className="fa fa-github fa-3x"></i>
                  <i className="fa fa-html5 fa-3x"></i>
                  <i className="fa fa-css3 fa-3x"></i>
                  <Img id="jsIcon" src="./assets/images/js-brands.svg" alt="js icon"/>
                </div>

                <p>This is a password generator application built while I attended the UCLA Extension coding bootcamp.</p>
            </div>
        </div>
        {/* <!-- Desktop --> */}
        <div className="row">
          <div className="two-third column">
            <div className="desktop">
              <div className="trim">
                    <iframe title="iframe" id="desktop" src="https://www.impactodedios.la/">
                    </iframe>
              </div>
            </div>
          </div>
            

            <div className="eight columns info">
                <a href="https://www.google.com" className="p-links">www.impactodedios.la</a>
                <div className="techs-used">
                  <i className="fa fa-github fa-3x"></i>
                  <i className="fa fa-html5 fa-3x"></i>
                  <i className="fa fa-css3 fa-3x"></i>
                  <Img id="jsIcon" src="./assets/images/js-brands.svg" alt="js icon"/>
                </div>

                <p>Website for non-profit orgranization. Manage and host the site.</p>
            </div>
        </div>

        <section id="contact">
          <div className="container">
            <div className="heading-wrapper">
              <div className="heading">
                <p className="title">Get in Touch.</p>
                <p className="separator"></p>
                <p className="subtitle">
                      Please, use the form below or send an email to jbtechdev@gmail.com
                </p>
                <form action="#" id="contact-form" netlify>
                  <input type="text" placeholder="Name" name="name" required/>
                  <input type="email" placeholder="Email" name="email" required/>
                  <textarea type="text" placeholder="Message" name="message"/>
                  <input className="button" id="submit" value="Submit" type="submit"/>
                </form>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
    </div>
  );
}

export default App;
