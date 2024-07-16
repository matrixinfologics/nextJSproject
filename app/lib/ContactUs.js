"use client";

import React, { useState } from "react";


export default function ContactUs() {
  const [formData] = useState({
    name: '',
    email: '',
    message: ''
  });


  return (
      <div className="contact-form">
        <div className="">
          <div lg="8">
            <h1 className="display-4 mb-4">Send Us With Message</h1>

          </div>
        </div>
        <div className="sec_sp">
          <div lg="7" className="d-flex align-items-center">
            <form className="contact__form w-100">
              <div>
                <div lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    type="text"
                    value={formData.name}
                    required
                  />
                </div>
                <div lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    required
                  />
                </div>
              </div>
              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                placeholder="Message"
                rows="5"
                value={formData.message}
                required
              ></textarea>
              <br />
              <div>
                <div lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}