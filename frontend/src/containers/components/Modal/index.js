import React from 'react'

import './index.css'

function Modal (props) {
  console.log(props)
  return (
    <div className={props.IsOpen ? 'modal_resultado fadeIn' : 'modal_resultado'}>
      <div className="modal_resultado_header">
        <span className="ff-mulish_regular">Para atingir <span className="ff-mulish_black">R$ 1 milhão</span> aos seus <span className="ff-mulish_black">76 anos</span> você deve investir:</span>
      </div>
      <div className="modal_resultado_valores-container">
        <div className="modal_resultado_valor">
          <h1 className="ff-mulish_black comParMais">{props.pmtComParMais !== null && props.pmtComParMais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/mês</h1>
          <span className="ff-mulish_regular"><span className="ff-mulish_black">COM</span> A ParMais</span>
        </div>
        <div className="modal_resultado_valor">
          <h1 className="ff-mulish_black semParMais">{props.pmtSemParMais !== null && props.pmtSemParMais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/mês</h1>
          <span className="ff-mulish_regular"><span className="ff-mulish_black">SEM</span> A ParMais</span>
        </div>
      </div>
      <div className="modal_resultado-motivo">
        <span className="ff-mulish_regular">Entenda o motivo dessa diferença, veja como a PARMAIS pode ajudá-lo a atingir R$ 1 MILHÃO.</span>
      </div>
      <div className="modal_resultado-btns">
        <button className="button-parmais button-inverse button-parmais_lg ff-mulish_bold" type="submit" onClick={(e) => props.closeModal(e) }>Refazer Simulação</button>
        <button className="button-parmais button-parmais_lg ff-mulish_bold" type="submit" onClick={(e) => { window.location.href = 'https://www.parmais.com.br/'; return null }}>Conhecer nossos serviços</button>
      </div>
    </div>
  )
}

export default Modal
