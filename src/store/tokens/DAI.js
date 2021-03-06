import { ModelToken } from '../../models'
import { getDotenvAddress } from '../helpers/methods'

export default ModelToken.create({
  code: 'DAI',
  address: getDotenvAddress('DAI_TOKEN'),
})