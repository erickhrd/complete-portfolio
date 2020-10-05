import emailjs from 'emailjs-com';
import React, { useState } from 'react';

const Contact = ({ data }) => {

   const [name, setName] = useState('');
   const [subject, setSubject] = useState('');
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');

   const [mailStatus, setMailStatus] = useState(false);
   const [failMail, setFailMail] = useState(false);

   const successMail = () => setMailStatus(true);
   const errorMail = () => setFailMail(true);

       function sendEmail(e) {

         e.preventDefault();

         emailjs.sendForm('gmail', 'template_8p3q1ex', e.target, 'user_CztfPYOGz50B7gzmYuVId')
           .then((result) => {
               console.log(result.text);
               successMail();
               setName('');
               setEmail('');
               setSubject('');
               setMessage('');
           } , (error) => {
               console.log(error.text);
               if(error.text === 'The g-recaptcha-response parameter not found'){
                  alert('Please Solve Captcha.')
               }else{
                  errorMail();
               }
           }); 
           
       }


    return (
      <section id="contact">

         <div className="row section-head">

            <div className="twelve columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{data?.message}</p>

            </div>

         </div>

         <div className="row">
            <div className="twelve columns">

            <form className="contact-form" action="?" method="POST" onSubmit={sendEmail}>
              
                  <label>Name<span className="required">*</span></label>
                  <input value={name} type="text" name="name" required onChange={e => setName(e.target.value)} />
                  <label>Email<span className="required">*</span></label>
                  <input value={email} type="email" name="email" required onChange={e => setEmail(e.target.value)}/>
                  <label>Subject</label>
                  <input value={subject} type="text" name="subject" onChange={e => setSubject(e.target.value)} />
                  <label>Message<span className="required">*</span></label>
                  <textarea value={message} name="message" required onChange={e => setMessage(e.target.value)}/>
                  <div class="g-recaptcha" data-sitekey="6LdTS-oUAAAAABUi894JifwUMsa6ucS1AjEgFMf8"></div>
                  <div id="success"></div>
                  <button className="submit" type="submit" value="Send">Submit</button>
               
            </form>
            
            {failMail ? <div id="message-warning">Error, please try again later.</div> : ''}
            {mailStatus ? <div id="message-success">
            <i className="fa fa-check"></i>Your message was sent, thank you!<br />
         </div> : ''}
        
           </div>
      </div>
   </section>
    );
}

export default Contact;
