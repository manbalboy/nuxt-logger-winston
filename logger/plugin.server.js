export default function (ctx, inject) {
  inject('logger', process.logger || {});
}
