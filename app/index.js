/*
 * The MIT License (MIT)
 * Copyright (c) 2018 Heat Ledger Ltd
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * */
var sdk = new quantsdk.QuantSDK()
function DOMContentLoaded() {
  $('#account-name').text('Quantower Paper Wallet')
  sdk.secretGenerator.generate().then(function (secret) {
    setSecretPhrase(secret)
  })
  $('#btn-apply-custom-secret').click(function () {
    setSecretPhrase($('#custom-secret').val())
  })
}

function setSecretPhrase(secret) {
  var publickey = sdk.crypto.secretPhraseToPublicKey(secret)
  var address = sdk.crypto.getAccountIdFromPublicKey(publickey)
  $('#secret').text(secret)
  $('#address').text(address)
  $('#address-nav-bar').text(address)
  $('#publicKey').text(publickey)

  var width = 210
  var qrcodeDefaults = {
    width: width,
    height: width,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  }

  $('#secret-qrcode').empty()
  $('#address-qrcode').empty()

  new QRCode($('#secret-qrcode')[0], Object.assign({ text: secret }, qrcodeDefaults))
  new QRCode($('#address-qrcode')[0], Object.assign({ text: address }, qrcodeDefaults))
  //new QRCode($('#publicKey-qrcode')[0], Object.assign({ text: publickey }, qrcodeDefaults))
}

document.addEventListener("DOMContentLoaded", DOMContentLoaded)
