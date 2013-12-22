// Generated by CoffeeScript 1.6.3
(function() {
  var fieldName, fieldValue, fileEncoding, fileTemp, fileTest, fs, i18nStringsFiles, should;

  fs = require('fs');

  should = require('should');

  i18nStringsFiles = require('../index');

  fileTemp = __dirname + '/temp.strings';

  fileTest = __dirname + '/test.strings';

  fileEncoding = 'UTF-8';

  fieldName = 'login_button';

  fieldValue = 'Log In';

  describe('Reading file into object', function() {
    return it('should populate object properties with values', function() {
      var data;
      data = i18nStringsFiles.readFileSync(fileTest, fileEncoding);
      return data[fieldName].should.equal(fieldValue);
    });
  });

  describe('Read, compile, parse', function() {
    return it('should populate object properties with values before and after', function() {
      var data, str;
      data = i18nStringsFiles.readFileSync(fileTest, fileEncoding);
      data[fieldName].should.equal(fieldValue);
      str = i18nStringsFiles.compile(data);
      data = i18nStringsFiles.parse(str);
      return data[fieldName].should.equal(fieldValue);
    });
  });

  describe('Read, write, read', function() {
    return it('should populate object properties with values before and after', function() {
      var data;
      data = i18nStringsFiles.readFileSync(fileTest, fileEncoding);
      data[fieldName].should.equal(fieldValue);
      i18nStringsFiles.writeFileSync(fileTemp, data, fileEncoding);
      data = i18nStringsFiles.readFileSync(fileTemp, fileEncoding);
      fs.unlinkSync(fileTemp);
      return data[fieldName].should.equal(fieldValue);
    });
  });

}).call(this);