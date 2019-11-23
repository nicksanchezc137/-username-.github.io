import React from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import firebase from "../firebase/config";

const steps = [
  {
    id: "0",
    message: "Hey there, I'm here to help out.",
    trigger: "1"
  },
  {
    id: "1",
    message: "Let me know what you need help with",
    trigger: "2"
  },
  {
    id: "2",
    options: [
      { value: 1, label: "An android application project", trigger: "3" },
      { value: 2, label: "A web project", trigger: "3" },
      { value: 3, label: "Rescue an existing application", trigger: "3" },
      { value: 4, label: "Something else", trigger: "5" }
    ]
  },
  {
    id: "3",
    message: "Awesome, what's your email address?",
    trigger: "4"
  },
  {
    id: "4",
    user: true,
    validator: value => {
      if (!value) {
        return "So empty 😥";
      } else {
        if (value.includes("@") && value.includes(".")) {
          return true;
        } else {
          return "Not email 😥";
        }
      }
    },
    trigger: "7"
  },
  {
    id: "5",
    message: "Tell me about it to see how I can help 👂",
    trigger: "6"
  },
  {
    id: "6",
    user: true,
    validator: value => {
      if (!value) {
        return "So empty 😥";
      }
      return true;
    },
    trigger: "3"
  },
  {
    id: "7",
    message: "Great, I'll shoot you an email",
    end: true
  }
];

const theme = {
  background: "#f5f8fb",
  fontFamily: "Open Sans",
  headerBgColor: "#061B3D",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#007BFF",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a"
};

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChat: false
    };
  }
  handleEnd({renderedSteps, steps, values }) {
    let type_of_service = renderedSteps.find(item => item.id === "2");
    let details = {value:"None"};
    if(type_of_service.value == 4){
        details  = renderedSteps.find(item => item.id === "6");
    }
    let email  = renderedSteps.find(item => item.id === "4");
  
   let  data = {
      type_of_service:type_of_service.value,
      details:details.value,
      email:email.value
   }
    firebase
   .firestore()
   .collection("inquiries")
   .doc()
   .set(data)
   .then(doc => {
    console.log('the data has been submitted')
   })
   .catch(function(error) {
     console.warn("Error getting document:", error);
   });

  }
  render() {
    return (
      <div id="my-contact" className="container text-center my-5">
        <h1 id="contact" className={"mb-3 " + this.props.fadeInLeft}>
          Contact
        </h1>
        <form
          className={this.props.shake}
          action="mailto:nderitunick@gmail.com"
          method="POST"
        >
          <div className="form-group">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 mx-auto">
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-lg"
                  id="name"
                  placeholder="Name"
                />
              </div>
            </div>
          </div>
          <div className="form-group hidden">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 mx-auto">
                <input
                  type="email"
                  name="_replyto"
                  className="form-control form-control-lg"
                  id="exampleFormControlInput1"
                  placeholder="Your email"
                />
              </div>
            </div>
          </div>
          <div className="form-group hiddenRight">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 mx-auto">
                <textarea
                  name="message"
                  className="form-control form-control-lg"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Write your message..."
                />
              </div>
            </div>
          </div>
          <div className="row text-md-right text-sm-center">
            <div className="col-12 col-sm-12 col-md-6 mx-auto">
              <button type="submit" className="btn btn-primary mb-2 hidden">
                Submit
              </button>
            </div>
          </div>
        </form>

        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex:1000
          }}
        >
          {this.state.showChat ? (
            <ThemeProvider theme={theme}>
              <ChatBot 
              botAvatar = "https://www.synaptive.com/img/fb-chatbot-icon.png"
              handleEnd={this.handleEnd}
              headerTitle = "Talk to me"
              // headerComponent = {
              //  <div style = {{
              //    height:50,
              //    flexDirection:"row",
              //    backgroundColor:"#061B3D"}}>
              //    <span>Talk to me</span>
              //     <button style = {{color:"#fff"}}>X</button>
              // </div>}
              steps={steps} />
            </ThemeProvider>
          ) : (
            <div>
              <button
                style={{
                  width: 90,
                  height: 90,
                  right: 10,
                  bottom: 10,
                  backgroundImage:
                    "url(https://www.synaptive.com/img/fb-chatbot-icon.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "50%"
                }}
                onClick={() => {
                  this.setState({ showChat: true });
                }}
              >
                
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Contact.propTypes = {
  fadeInLeft: PropTypes.string,
  shake: PropTypes.string
};
