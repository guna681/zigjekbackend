module.exports = {
  'up': `INSERT INTO DocumentType (Name, Type, FieldName , ApplicableTo , IsRequired, DocType) VALUES
        ('Profile Photo', 'FILE', 'PROFILE_PHOTO', 'provider', '1', 'photo'),
        ('Driver's License - (Front)', 'FILE', 'LICENSE_FRONT', 'provider', '1', 'card'),
        ('Driver's License - (Back)', 'FILE', 'LICENSE_BACK', 'provider', '1', 'card'),
        ('PAN Card', 'FILE', 'PAN_CARD', 'provider', '1', 'card'),
        ('Identity card - (Front)', 'FILE', 'IDENTITY_CARD', 'provider', '1', 'card'),
        ('Aadhar Card - (Back)', 'FILE', 'AADHAR_CARD_BACK', 'provider', '1', 'card'),
        ('Account Holder Name', 'TEXT', 'BANK_ACCOUNT_HOLDER', 'bank', '1', 'text'),
        ('Account Holder Mobile', 'INT', 'BANK_ACCOUNT_MOBILE', 'bank', '1', 'text'),
        ('Account Number', 'TEXT', 'BANK_ACC_NUMBER', 'bank', '1', 'text'),
        ('IFSC code', 'TEXT', 'BANK_IFSC_CODE', 'bank', '1', 'text'),
        ('SWIFT code', 'TEXT', 'BANK_SWIFT_CODE', 'bank', '1', 'text'),
        ('Address', 'TEXT', 'BANK_ACC_ADDRESS', 'bank', '1', 'text'),
        ('Document', 'FILE', 'Document name', 'provider', '1', 'card');`,
  'down': `DELETE FROM DocumentType`
}
