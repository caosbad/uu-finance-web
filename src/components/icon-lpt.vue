<template>
  <span class="icon-lpt" :style=style>
    <icon-token
      v-for="token in tokens"
      :key="'icon-lpt-' + token.code"
      :code=token.code
      :size=token.size />
  </span>
</template>

<script>
import IconToken from './icon-token'

export default {
  name: 'icon-lpt',
  props: {
    code: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '32'
    }
  },
  components: {
    IconToken
  },
  computed: {
    style () {
      const { size } = this

      return {
        width: size + 'px',
        height: size + 'px',
      }
    },
    tokens () {
      const { size, code } = this
      // TODO: 规划好
      const tokenSize = +size * 0.6

      return code.split('_').map(tokenCode => ({ size: tokenSize, code: tokenCode }))
    }
  }
}
</script>

<style lang="less" scoped>
.icon-lpt {
  display: flex;
  justify-content: space-between;
  padding: 1px 0 0 1px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  > .icon-token {
    &:nth-child(1):first-child {
      position: relative;
    }
    &:nth-child(2):last-child {
      margin-left: -30%;
      font-size: 0;
      line-height: 0;
      &::before {
        content: '';
        width: 128%;
        height: 128%;
        display: inline-block;
        background-color: #fff;
        border-radius: 50%;
        margin-left: -74%;
        margin-top: -14%;
      }
    }
  }
}
</style>