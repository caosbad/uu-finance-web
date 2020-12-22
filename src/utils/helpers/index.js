export function formatNumber(number, dec = 2, dsep, tsep) {
  if(number == 0) return 0
  if (isNaN(+number) || number == null) return '';
  number = parseFloat(number)
  number = number.toFixed(~~dec);
  tsep = typeof tsep == 'string' ? tsep : ',';

  var parts = number.split('.'),
    fnums = parts[0],
    decimals = parts[1] ? (dsep || '.') + parts[1] : '';

  return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
}