import React, { useEffect, useState } from 'react';

type Font = {
    family: string,
    subsets: string[],
    version: string,
    category: string,
    variants: string[],
}

const GOOGLE_FONT_API = 'https://apiv2.popupsmart.com/api/googlefont';

type PropType = {
    onSubmit: () => void,
    onLoad: () => void,
}

const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const Form = (props: PropType) => {
    
    const [fonts, setFonts] = useState<Font[]>([]);
    const [error, setError] = useState<string>('');
    const [errors, setErrors] = useState({ name: '', email: '', font: '' });
    const [formValues, setFormValues] = useState({ name: '', email: '', font: '' });

    useEffect(() => {
        start();
    },[]);

    // If you mean data always saved to localStorage even if user not submit the form 
    // useEffect(() => {
    //     localStorage.setItem("data", JSON.stringify(formValues));
    // }, [formValues]);
    
    const start = async () => {
        try {
            const res = await fetch(GOOGLE_FONT_API);
            let fonts: Font[] = await res.json();
            fonts = fonts.filter(font => font.category !== 'monospace');
            fonts = fonts.sort((a, b) => a.family.localeCompare(b.family));
            setFonts(fonts);
            setError('');
        } catch (error) {
            setFonts([]);
            setError('Something Went Wrong');
        }
        props.onLoad();
    }


    const validateForm = () => {

        const errors = { name: '', email: '', font: '' };
        let anyError = false;
    
        if (!formValues.name) {
            errors.name = 'This field is required';
            anyError = true;
        } else errors.name = '';
        if (!formValues.email) {
            errors.email = 'This field is required';
            anyError = true;
        } else if (!formValues.email.match(emailRegex)) {
            errors.email = 'Invalid email address';
            anyError = true;
        } else errors.email = '';
        if (!formValues.font) {
            errors.font = 'This field is required';
            anyError = true;
        } else errors.font = '';

        if (!anyError) {
            // If you mean data only saved to localStorage on submitting form
            localStorage.setItem("data", JSON.stringify(formValues));
            props.onSubmit();
        }

        setErrors(errors);

    }

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        validateForm();
    }

    return (
        <form onSubmit={onFormSubmit} className="main-side-popup-content-form">
            <div className='form-element'>
                <input 
                    className="form-input" placeholder="Your name" 
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                ></input>
                {errors["name"] && 
                <small className="required-message">
                    <i className='fa fa-info-circle'></i>
                    {errors["name"]}
                </small>}
            </div>
            <div className='form-element'>
                <input 
                    className="form-input" placeholder="Email" 
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                ></input>
                {errors["email"] && 
                <small className="required-message">
                    <i className='fa fa-info-circle'></i>
                    {errors["email"]}
                </small>}
            </div>
            <div className='form-element'>
                <select
                    className="font-dropdown"
                    disabled={error ? true : false}
                    onChange={(e) => setFormValues({ ...formValues, font: e.target.value })}
                    defaultValue={error ? "error" : "placeholder"}
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
                {errors["font"] && 
                <small className="required-message">
                    <i className='fa fa-info-circle'></i>
                    {errors["font"]}
                </small>}
            </div>
            <button type="submit" className="submit-button">GET MY 30% OFF</button>
        </form>
    );
}

export default Form;
