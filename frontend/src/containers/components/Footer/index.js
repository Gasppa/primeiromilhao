import React from 'react'
import logo from '../../../assets/images/parmais-logo.png'
import './index.css'

function Footer () {
  return (
    <div className="footer_parmais">
      <div className="footer-div logo">
        <img className="footer_parmais_logo" src={logo}/>
      </div>
      <div className="footer-div name">
          <span className="ff-mulish_black footer_parmais_name">ParMais Investimentos Financeiros</span>
      </div>
      <div className="divider"></div>
      <div className="footer-div cnpj">
        <span className="ff-mulish_regular footer_parmais_cnpj">PAR MAIS GESTÃO ADMINISTRAÇÃO DE VALORES MOBILIÁRIOS
  CNPJ: 21.719.643/0001-60</span>
      </div>
    </div>
  )
}

export default Footer
