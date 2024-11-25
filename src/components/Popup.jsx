import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/Popup.css'
import IMask from 'imask'

const Popup = ({ isOpen, closePopup }) => {
  const expiredRef = useRef(null)
  const expiredMask = useRef(null)
  const nameRef = useRef(null)
  const numberRef = useRef(null)
  const numberMask = useRef(null)
  const cvcRef = useRef(null)
  const cvcMask = useRef(null)
  const creditCardRef = useRef(null)

  useEffect(() => {
    expiredMask.current = new IMask(expiredRef.current, {
      mask: 'MM{/}YY',
      blocks: {
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
        },
        YY: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 99,
        },
      },
    })
    numberMask.current = new IMask(numberRef.current, {
      mask: '0000 0000 0000 0000',
    })
    cvcMask.current = new IMask(cvcRef.current, {
      mask: '000',
    })
    return () => {
      if (expiredMask.current) expiredMask.current.destroy()
      if (numberMask.current) expiredMask.current.destroy()
      if (cvcMask.current) expiredMask.current.destroy()
    }
  }, [])

  const dfCardInfo = {
    number: '0000 0000 0000 0000',
    name: 'BUI DUC TUAN',
    expired: '01/27',
    cvc: '575',
  }
  const dfError = {
    name: false,
    number: false,
    expired: false,
    cvc: false,
  }
  const [cardInfo, setCardInfo] = useState({})
  const onChangeCard = (field, value) => {
    setCardInfo((prev) => ({
      ...prev,
      [field]:
        value !== undefined && value !== null ? value : dfCardInfo[field],
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }))
  }
  const [errors, setErrors] = useState(dfError)
  const validateFields = () => {
    const err = {
      name: !nameRef.current.value.trim(),
      number: !numberRef.current.value
        .trim()
        .replace(/\s/g, '')
        .match(/^\d{16}$/),
      expired:
        !expiredRef.current.value.trim() ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardInfo.expired),
      cvc: !cvcRef.current.value.trim() || cardInfo.cvc.length !== 3,
    }
    setErrors(err)
    return !Object.values(err).some((error) => error)
  }
  /**
   * @ Reset input value if component unmount
   */
  const clean = () => {
    if (expiredRef.current) expiredRef.current.value = ''
    if (numberRef.current) numberRef.current.value = ''
    if (cvcRef.current) cvcRef.current.value = ''
    if (nameRef.current) nameRef.current.value = ''
    setCardInfo(dfCardInfo)
  }
  const wrapperCard = () => {
    if (creditCardRef.current) {
      creditCardRef.current.classList.toggle('flipped')
    }
  }
  /* @Purpose: Input Validate
   * @Description: Other way approach Regex insted check event key
   * **/
  const onKeyDown = (e) => {
    if (
      !/[0-9]/.test(e.key) &&
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
    ) {
      e.preventDefault()
    }
  }

  const payment = (e) => {
    e.preventDefault()
    const isValid = validateFields()
    if (isValid) {
      window.alert('Download....')
      closePopup()
    }
  }
  useEffect(() => {
    if (!isOpen) clean()
  }, [isOpen])
  const onFocusFrontCard = () => {
    if (creditCardRef.current) {
      creditCardRef.current.classList.remove('flipped')
    }
  }
  return (
    <div className={`popup-overlay ${isOpen ? 'd-block' : 'd-none'}`}>
      <div className={`popup ${isOpen ? 'd-block' : 'd-none'}`}>
        <div className="container preload">
          <div ref={creditCardRef} className="creditcard" onClick={wrapperCard}>
            <div className="front">
              <div id="ccsingle"></div>
              <svg
                id="cardfront"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 750 471"
              >
                <g id="Front">
                  <g id="CardBackground">
                    <path
                      id="Rectangle-1_1_"
                      className="lightcolor grey"
                      d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40
                  C0,17.9,17.9,0,40,0z"
                    />
                    <path
                      className="darkcolor greydark"
                      d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z"
                    />
                  </g>
                  <text
                    transform="matrix(1 0 0 1 60.106 295.0121)"
                    id="svgnumber"
                    className="st2 st3 st4"
                  >
                    {cardInfo.number}
                  </text>
                  <text
                    transform="matrix(1 0 0 1 54.1064 428.1723)"
                    id="svgname"
                    className="st2 st5 st6"
                  >
                    {cardInfo.name}
                  </text>
                  <text
                    transform="matrix(1 0 0 1 54.1074 389.8793)"
                    className="st7 st5 st8"
                  >
                    cardholder name
                  </text>
                  <text
                    transform="matrix(1 0 0 1 479.7754 388.8793)"
                    className="st7 st5 st8"
                  >
                    expiration
                  </text>
                  <text
                    transform="matrix(1 0 0 1 65.1054 241.5)"
                    className="st7 st5 st8"
                  >
                    card number
                  </text>
                  <g>
                    <text
                      transform="matrix(1 0 0 1 574.4219 433.8095)"
                      id="svgexpire"
                      className="st2 st5 st9"
                    >
                      {cardInfo.expired}
                    </text>
                    <text
                      transform="matrix(1 0 0 1 479.3848 417.0097)"
                      className="st2 st10 st11"
                    >
                      VALID
                    </text>
                    <text
                      transform="matrix(1 0 0 1 479.3848 435.6762)"
                      className="st2 st10 st11"
                    >
                      THRU
                    </text>
                    <polygon
                      className="st2"
                      points="554.5,421 540.4,414.2 540.4,427.9"
                    />
                  </g>
                </g>
                <g id="Back"></g>
              </svg>
            </div>
            <div className="back">
              <svg
                id="cardback"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 750 471"
              >
                <g id="Back">
                  <rect y="61.6" className="st2" width="750" height="78" />
                  <text
                    transform="matrix(1 0 0 1 621.999 227.2734)"
                    id="svgsecurity"
                    className="st6 st7"
                  >
                    {cardInfo.cvc}
                  </text>
                  <text
                    transform="matrix(1 0 0 1 518.083 280.0879)"
                    className="st9 st6 st10"
                  >
                    security code
                  </text>
                  <rect
                    x="58.1"
                    y="378.6"
                    class="st11"
                    width="375.5"
                    height="13.5"
                  />
                  <rect
                    x="58.1"
                    y="405.6"
                    class="st11"
                    width="421.7"
                    height="13.5"
                  />
                  <text
                    transform="matrix(1 0 0 1 59.5073 228.6099)"
                    id="svgnameback"
                    class="st12 st13"
                  >
                    {cardInfo.name}
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="form-container">
          <div className="field-container">
            <label htmlFor="name">Name</label>
            <input
              className={errors.name ? 'input-error' : ''}
              id="name"
              maxLength="20"
              type="text"
              ref={nameRef}
              onFocus={onFocusFrontCard}
              onChange={(event) => onChangeCard('name', event.target.value)}
            />
            {errors.name && (
              <small className="error-text">Vui lòng nhập tên!</small>
            )}
          </div>
          <div className="field-container">
            <label htmlFor="number">Card Number</label>
            <input
              id="number"
              type="text"
              maxLength="20"
              ref={numberRef}
              onFocus={onFocusFrontCard}
              onChange={(event) => onChangeCard('number', event.target.value)}
            />
            {errors.number && (
              <small className="error-text">Vui lòng nhập số thẻ hợp lệ!</small>
            )}
          </div>
          <div className="field-container">
            <label htmlFor="expired">Expiration (mm/yy)</label>
            <input
              ref={expiredRef}
              id="expired"
              maxLength="5"
              type="text"
              className={errors.expired ? 'input-error' : ''}
              inputMode="numeric"
              placeholder="MM/YY"
              onFocus={onFocusFrontCard}
              onChange={(event) => onChangeCard('expired', event.target.value)}
            />
            {errors.expired && (
              <small className="error-text">
                Vui lòng nhập ngày hết hạn hợp lệ (MM/YY)!
              </small>
            )}
          </div>
          <div className="field-container">
            <label htmlFor="securitycode">Security Code</label>
            <input
              type="text"
              maxLength="3"
              ref={cvcRef}
              className={errors.cvc ? 'input-error' : ''}
              inputMode="numeric"
              onFocus={() => {
                document.querySelector('.creditcard').classList.add('flipped')
              }}
              onChange={(event) => onChangeCard('cvc', event.target.value)}
            />
            {errors.cvc && (
              <small className="error-text">Vui lòng nhập CVC hợp lệ !!!</small>
            )}
          </div>
        </div>
        <div className="d-flex justify-center m-auto items-center">
          <button
            className="btn btn-primary me-2"
            onClick={(event) => {
              payment(event)
            }}
          >
            Xác nhận
          </button>
          <button className="btn btn-danger" onClick={closePopup}>
            Trở về
          </button>
        </div>
      </div>
    </div>
  )
}

export default Popup
