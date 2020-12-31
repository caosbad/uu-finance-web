import BigNumber from 'bignumber.js'
import * as helpers from '../../utils/helpers'
import { floor } from '../../utils/math/round'
import ModelState from '../base/state'

import ModelValueUint8 from './uint8'

const ModelValueEther = {
  /**
   * @return {!Object}
   */
  create ({
    decimal = 18,
    decimals = ModelValueUint8.create(),
    ether = undefined,
    handled = undefined,
    viewDecimal = 6,
    viewDefault = '-',
    viewMethod = floor
  } = {}) {
    const __store__ = {
      ether: '000000000000000000',
      handled: '',
      view: viewDefault
    }

    const model = {
      type: 'uint256',

      /** @type {number} */
      decimal,
      decimals,
      /** @type {number} */
      get precision () {
        const { decimal, decimals } = this

        return Math.pow(10, decimals.handled || decimal)
      },

      /**
       * Universal data
       * @type {(string|number)}
       */
      get value () {
        return this.ether
      },
      set value (val) {
        this.ether = val
      },

      /** @type {string} */
      get ether () {
        return __store__.ether
      },
      set ether (val) {
        const { precision } = this
        const result = __store__.ether = val

        this.handled = BigNumber(result).div(precision).toString()
      },

      /** @type {string|number} */
      get handled () {
        return __store__.handled
      },
      set handled (val) {
        __store__.handled = val

        this.state.afterUpdate()
      },

      viewDecimal,
      /** @type {string} */
      get view () {
        const { handled, viewDecimal, loading } = this

        if (!loading) {
  
          // FIXME: formatNumber toFixed -> round()
          __store__.view = helpers.formatNumber(viewMethod(handled, viewDecimal), viewDecimal)
        }

        return __store__.view
      },

      state: ModelState.create()
    }

    ether != null
      && (model.ether = ether)

    return model
  }
}

export default ModelValueEther
