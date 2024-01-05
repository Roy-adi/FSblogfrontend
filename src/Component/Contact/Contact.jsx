import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

  return (
    <div>
      <section className="main-wrap">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="left-contact">
                <h2 className="contact-title">
                  <span>Send Us</span> Message
                </h2>
                <form className="rd-mailform" >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-label">Your name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label className="form-label">Your phone</label>
                        <input
                          className="form-control"
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Your e-mail</label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label">Message</label>
                        <textarea
                          className="form-control"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <button className="btn-send" type="submit">
                    Send message
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-5">
              <div className="map-box">
                {/* ... Google Maps iframe ... */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact