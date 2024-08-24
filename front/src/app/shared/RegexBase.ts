export const RegexBase = {
  required : /[^ ]/,
  all: /.*/,
  norm: /^[\w àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇ-]*$/i,
  nonum : /^[^0-9]*$/,
  tel: /^[0-9]{10}$/,
  code_postal: /^[0-9]{5}$/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
  lang_path: /^\w+(\.\w+)*$/,
  bar_code:/^\d+$/
}
