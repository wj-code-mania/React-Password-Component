import React, { useRef, useState } from 'react'
import './PasswordForm.css'

const PasswordForm = () => {

  const passRef = useRef()
  const confirmRef = useRef()
  const [message, setMessage] = useState('')


  const getPasswordValidation = (password, newPassword) => {
    let bValidate = true
    const reason = [] 
    if (password != newPassword) {
      reason.push('Password does not match with confirmation.')
      bValidate = false
    }

    if (password.length < 6) {
      reason.push('Password should have a min length of 6 characters.')
      bValidate = false
    }
    
    const regExLowerCase = /[a-z]/
    const regExUpperCase = /[A-Z]/
    const regExNumber = /\d/
    const regExSpecial = /[!@#$%^&*()_\-+={\[}\]|:;"'<,>.]/
    
    if (!regExLowerCase.test(password)) {
      reason.push('Password should contain at least 1 lowercase character.')
      bValidate = false
    }
    if (!regExUpperCase.test(password)) {
      reason.push('Password should contain at least 1 uppercase character.')
      bValidate = false
    }
    if (!regExNumber.test(password)) {
      reason.push('Password should contain at least 1 number.')
      bValidate = false
    }
    if (!regExSpecial.test(password)) {
      reason.push('Password should contain at least 1 special character.')
      bValidate = false
    }

    return [bValidate, reason]
  }

  const validateForm = e => {
    const { value: passRefVal } = passRef.current
    const { value: confirmRefVal } = confirmRef.current

    const [success, reason] = getPasswordValidation(passRefVal, confirmRefVal)
    if (success) {
      setMessage('Set the password successfully.')
    } else {
      setMessage(
        reason.map((item, index) => <div className='Warning-Item' key={index}>{item}</div>)
      )
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.target.id == 'new_password') {
        confirmRef.current.focus()
      } else if (event.target.id == 'confirm_password') {
        validateForm()
      }
      
    }
  }

  return (
    <div className='Wrapper'>
      <div>
        <input type='password' ref={passRef} onKeyDown={handleKeyDown} id='new_password' />
        <input type='password' ref={confirmRef} onKeyDown={handleKeyDown} id='confirm_password' />
        <input type='button' value='submit' onClick={validateForm}/>
      </div>
      <div className='Message-Panel'>
        {
          message
        }
      </div>
    </div>
  )
}

export default PasswordForm