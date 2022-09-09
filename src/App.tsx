import React, { useEffect, useState } from 'react';
import bg1 from './bg1.png';
import './App.css';

type Font = {
  family: string,
  subsets: string[],
  version: string,
  category: string,
  variants: string[],
}

const GOOGLE_FONT_API = 'https://apiv2.popupsmart.com/api/googlefont';

const App = () => {

  const [fonts, setFonts] = useState<Font[]>([]);
  const [selectedFontFamily, setSelectedFontFamily] = useState<string>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [headline, setHeadline] = useState<string>('NEW STUFF');
  const [description, setDescription] = useState<string>('Sign up for our newsletter and get 15% off your first order!');
  const [successMessage, setSuccessMessage] = useState<string>('Success');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState({ name: '', email: '', font: '' });
  const [formValues, setFormValues] = useState({ name: '', email: '', font: '' });

  useEffect(() => {
    start();
  },[]);

  const start = async () => {
    try {
      const res = await fetch(GOOGLE_FONT_API);
      let fonts: Font[] = await res.json();
      fonts = fonts.filter(font => font.category !== 'monospace');
      fonts = fonts.sort((a, b) => a.family.localeCompare(b.family));
      setFonts(fonts);
      setSelectedFontFamily('placeholder');
      setError('');
    } catch (error) {
      setFonts([]);
      setSelectedFontFamily('');
      setError('Something Went Wrong');
    }
    setLoading(false);
  }

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    validateForm();
    // setSubmitted(true);
  }

  const validateForm = () => {

    let errors = { name: '', email: '', font: '' };

    if (!formValues.name) {
      errors.name = 'This field is required';
    } 
    if (!formValues.email) {
      errors.email = 'This field is required';
    }
    if (!formValues.font) {
      errors.font = 'This field is required';
    }

    setErrors(errors);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="setting-side">
          <div className="setting-side-container">
            <h4 className="setting-side-container-header">General Settings</h4>
            <label>Headline</label>
            <input
              type="text"
              id="headline"
              name="headline"
              onChange={(e) => setHeadline(e.target.value)}
              value={headline}
            ></input>
            <label>Description</label>
            <textarea
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
            <label>Success Message</label>
            <input
              type="text"
              id="successMessage"
              name="successMessage"
              onChange={(e) => setSuccessMessage(e.target.value)}
              value={successMessage}
            ></input>
          </div>
        </div>
        <div className="main-side">
          <div className="main-side-container">
            {/* <img className="main-side-background" src={bg1} alt="background" /> */}
            <div className="main-side-popup">
              <div className="main-side-popup-content">
                {!submitted ? <form onSubmit={onFormSubmit}>
                  <button className="close-button">
                    <i className="fa fa-times"></i>
                  </button>
                  <h1 className="headline">{headline}</h1>
                  <div className="main-side-popup-content-main">
                    <span className="description">{description}</span>
                    <div className='form-element'>
                      <input className="form-input" placeholder="Your name"></input>
                      {errors["name"] && <small className="required-message"><i className='fa fa-info-circle'></i>{errors["name"]}</small>}
                    </div>
                    <div className='form-element'>
                      <input className="form-input" placeholder="Email"></input>
                      {errors["email"] && <small className="required-message"><i className='fa fa-info-circle'></i>{errors["email"]}</small>}
                    </div>
                    <div className='form-element'>
                      {!loading &&
                        <>
                          <select
                            className="font-dropdown" value={selectedFontFamily}
                            disabled={error ? true : false}
                            onChange={(e) => setSelectedFontFamily(e.target.value)} 
                          >
                            {error ?
                              <option value="error">{error}</option> :
                              <option value="placeholder" disabled>Select Font</option>
                            }
                            {!error && 
                              fonts && fonts.length && fonts.map(font => (
                                <option value={font.family} key={font.family} style={{ 'fontFamily': `${font.family}, ${font.category}` }}>{font.family}</option>
                              ))
                            }
                          </select>
                          {errors["font"] && <small className="required-message"><i className='fa fa-info-circle'></i>{errors["font"]}</small>}
                        </>
                      }
                    </div>
                    <button type="submit" className="submit-button">GET MY 30% OFF</button>
                  </div>
                </form> : 
                <>
                  <i className="fa fa-check success-icon"></i>
                  <h1 className="success-message">{successMessage}</h1>
                </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
