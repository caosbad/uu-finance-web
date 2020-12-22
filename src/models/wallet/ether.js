import BigNumber from 'bignumber.js'
import * as helpers from '../../utils/helpers'
import { floor } from '../../utils/math/round'

export default {
  /**
   * @return {!Object}
   */
  create ({
    decimal = 18,
    contDecimal = 6,
    contDefault = '-',
    contMethod = floor,
    trigger = null
  } = {}) {
    const addressDefault = '0x0000000000000000000000000000000000000000'
    const __store__ = {
      address: addressDefault,
      addressDefault,
      ether: '000000000000000000',
      handled: '',
      cont: contDefault,
      contDefault
    }

    return {
      /** @type {number} */
      decimal,
      /** @type {number} */
      get precision () {
        const { decimal } = this

        return Math.pow(10, decimal)
      },

      /** @type {boolean} */
      loading: true,
      beforeUpdate () {
        this.loading = true
      },
      afterUpdate () {
        this.loading = false
      },

      /**
       * 钱包地址是否已初始化
       * - 判断是否已成功赋值过钱包地址
       * @type {boolean}
       */
      initializedAddress: false,
      /**
       * 更新钱包地址
       * @type {string}
       */
      get address () {
        const { initializedAddress } = this
        const { address, addressDefault } = __store__
        // const result = currentContract ? currentContract.default_account : address
        const result = address

        // 地址产生变更，且不是缺省地址
        // TODO: valid
        if (result && result !== address && result !== addressDefault) {
          if (!initializedAddress) {
            this.initializedAddress = true
          }

          this.beforeUpdate()
          __store__.address = result

          this.trigger
            && this.trigger(result)
              .then(data => {
                this.ether = data
              })
        }

        return result
      },

      /**
       * 触发器
       * @type {Function}
       */
      trigger,

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

        this.afterUpdate()
      },

      contDecimal,
      contMethod,
      /** @type {string} */
      get cont () {
        const { contDefault } = __store__
        // FIXME: address
        const { handled, contDecimal, loading, address } = this
        let result = contDefault

        if (!loading) {
          // FIXME: formatNumber toFixed -> round()
          result = __store__.cont = helpers.formatNumber(contMethod(handled, contDecimal), contDecimal)
        }

        return result
      }
    }
  }
}
