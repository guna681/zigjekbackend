module.exports = {
  'up': `INSERT INTO DocumentType (Id, Name, Type, FieldName , ApplicableTo , IsRequired, DocType) VALUES
        (1, 'Profile Photo', 'FILE', 'PROFILE_PHOTO', 'provider', '1', 'photo'),
        (2, 'Driver's License - (Front)', 'FILE', 'LICENSE_FRONT', 'provider', '1', 'card'),
        (3, 'Driver's License - (Back)', 'FILE', 'LICENSE_BACK', 'provider', '1', 'card'),
        (4, 'PAN Card', 'FILE', 'PAN_CARD', 'provider', '1', 'card'),
        (5, 'Identity card - (Front)', 'FILE', 'IDENTITY_CARD', 'provider', '1', 'card'),
        (6, 'Aadhar Card - (Back)', 'FILE', 'AADHAR_CARD_BACK', 'provider', '1', 'card'),
        (7, 'Account Holder Name', 'TEXT', 'BANK_ACCOUNT_HOLDER', 'bank', '1', 'text'),
        (8, 'Account Holder Mobile', 'INT', 'BANK_ACCOUNT_MOBILE', 'bank', '1', 'text'),
        (9, 'Account Number', 'TEXT', 'BANK_ACC_NUMBER', 'bank', '1', 'text'),
        (10, 'IFSC code', 'TEXT', 'BANK_IFSC_CODE', 'bank', '1', 'text'),
        (11, 'SWIFT code', 'TEXT', 'BANK_SWIFT_CODE', 'bank', '1', 'text'),
        (12, 'Address', 'TEXT', 'BANK_ACC_ADDRESS', 'bank', '1', 'text'),
        (13, 'Document', 'FILE', 'Document name', 'provider', '1', 'card');`,
  'down': `DELETE FROM DocumentType`
}
