const crypto = require('crypto');

const DashPlatformProtocol = require('@dashevo/dpp');

const generateRandomIdentifier = require('@dashevo/dpp/lib/test/utils/generateRandomIdentifier');

const featureFlagsContractDocumentsSchema = require('../../schema/feature-flags-documents.json');

describe('Feature Flags contract', () => {
  let dpp;
  let dataContract;
  let identityId;

  beforeEach(function beforeEach() {
    const fetchContractStub = this.sinon.stub();

    dpp = new DashPlatformProtocol({
      stateRepository: {
        fetchDataContract: fetchContractStub,
      },
    });

    identityId = generateRandomIdentifier();

    dataContract = dpp.dataContract.create(identityId, featureFlagsContractDocumentsSchema);

    fetchContractStub.resolves(dataContract);
  });

  it('should have a valid contract definition', async () => {
    const validationResult = await dpp.dataContract.validate(dataContract);

    expect(validationResult.isValid()).to.be.true();
  });

  describe('documents', () => {
    describe('updateConsensusParams', () => {
      let rawUpdateConsensusParamsDocument;

      beforeEach(() => {
        rawUpdateConsensusParamsDocument = {

        };
      });

      it('should have at least one property', () => {
        rawUpdateConsensusParamsDocument = {};

        try {
          dpp.document.create(dataContract, identityId, 'updateConsensusParams', rawUpdateConsensusParamsDocument);

          expect.fail('should throw error');
        } catch (e) {
          expect(e.name).to.equal('InvalidDocumentError');
          expect(e.getErrors()).to.have.a.lengthOf(1);

          const [error] = e.getErrors();

          expect(error.name).to.equal('JsonSchemaError');
          expect(error.keyword).to.equal('required');
          expect(error.params.missingProperty).to.equal('label');
        }
      });

      describe('label', () => {
        it('should be present', async () => {
          delete rawUpdateConsensusParamsDocument.label;

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('required');
            expect(error.params.missingProperty).to.equal('label');
          }
        });

        it('should follow pattern', async () => {
          rawUpdateConsensusParamsDocument.label = 'invalid label';

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('pattern');
            expect(error.dataPath).to.equal('.label');
          }
        });

        it('should be longer than 3 chars', async () => {
          rawUpdateConsensusParamsDocument.label = 'ab';

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('minLength');
            expect(error.dataPath).to.equal('.label');
          }
        });

        it('should be less than 63 chars', async () => {
          rawUpdateConsensusParamsDocument.label = 'a'.repeat(64);

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('maxLength');
            expect(error.dataPath).to.equal('.label');
          }
        });
      });

      describe('normalizedLabel', () => {
        it('should be defined', async () => {
          delete rawUpdateConsensusParamsDocument.normalizedLabel;

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('required');
            expect(error.params.missingProperty).to.equal('normalizedLabel');
          }
        });

        it('should follow pattern', async () => {
          rawUpdateConsensusParamsDocument.normalizedLabel = 'InValiD label';

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('pattern');
            expect(error.dataPath).to.equal('.normalizedLabel');
          }
        });

        it('should be less than 63 chars', async () => {
          rawUpdateConsensusParamsDocument.normalizedLabel = 'a'.repeat(64);

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('maxLength');
            expect(error.dataPath).to.equal('.normalizedLabel');
          }
        });
      });

      describe('normalizedParentDomainName', () => {
        it('should be defined', async () => {
          delete rawUpdateConsensusParamsDocument.normalizedParentDomainName;

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('required');
            expect(error.params.missingProperty).to.equal('normalizedParentDomainName');
          }
        });

        it('should be less than 190 chars', async () => {
          rawUpdateConsensusParamsDocument.normalizedParentDomainName = 'a'.repeat(191);

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('maxLength');
            expect(error.dataPath).to.equal('.normalizedParentDomainName');
          }
        });

        it('should follow pattern', async () => {
          rawUpdateConsensusParamsDocument.normalizedParentDomainName = '&'.repeat(100);

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('pattern');
            expect(error.dataPath).to.equal('.normalizedParentDomainName');
          }
        });
      });

      describe('preorderSalt', () => {
        it('should be defined', async () => {
          delete rawUpdateConsensusParamsDocument.preorderSalt;

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('required');
            expect(error.params.missingProperty).to.equal('preorderSalt');
          }
        });

        it('should not be empty', async () => {
          rawUpdateConsensusParamsDocument.preorderSalt = Buffer.alloc(0);

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('minItems');
            expect(error.dataPath).to.equal('.preorderSalt');
          }
        });

        it('should be not less than 32 bytes', async () => {
          rawUpdateConsensusParamsDocument.preorderSalt = crypto.randomBytes(10);

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('minItems');
            expect(error.dataPath).to.equal('.preorderSalt');
          }
        });

        it('should be not longer than 32 bytes', async () => {
          rawUpdateConsensusParamsDocument.preorderSalt = crypto.randomBytes(40);

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('maxItems');
            expect(error.dataPath).to.equal('.preorderSalt');
          }
        });
      });

      it('should not have additional properties', async () => {
        rawUpdateConsensusParamsDocument.someOtherProperty = 42;

        try {
          dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

          expect.fail('should throw error');
        } catch (e) {
          expect(e.name).to.equal('InvalidDocumentError');
          expect(e.getErrors()).to.have.a.lengthOf(1);

          const [error] = e.getErrors();

          expect(error.name).to.equal('JsonSchemaError');
          expect(error.keyword).to.equal('additionalProperties');
          expect(error.params.additionalProperty).to.equal('someOtherProperty');
        }
      });

      it('should be valid', async () => {
        const domain = dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

        const result = await dpp.document.validate(domain);

        expect(result.isValid()).to.be.true();
      });

      describe('Records', () => {
        it('should be defined', async () => {
          delete rawUpdateConsensusParamsDocument.records;

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('required');
            expect(error.params.missingProperty).to.equal('records');
          }
        });

        it('should not be empty', async () => {
          rawUpdateConsensusParamsDocument.records = {};

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('minProperties');
            expect(error.dataPath).to.equal('.records');
          }
        });

        it('should not have additional properties', async () => {
          rawUpdateConsensusParamsDocument.records = {
            someOtherProperty: 42,
          };

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('additionalProperties');
            expect(error.dataPath).to.equal('.records');
            expect(error.params.additionalProperty).to.equal('someOtherProperty');
          }
        });

        describe('Dash Identity', () => {
          it('should have either `dashUniqueIdentityId` or `dashAliasIdentityId`', async () => {
            rawUpdateConsensusParamsDocument.records = {
              dashUniqueIdentityId: identityId,
              dashAliasIdentityId: identityId,
            };

            try {
              dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

              expect.fail('should throw error');
            } catch (e) {
              expect(e.name).to.equal('InvalidDocumentError');
              expect(e.getErrors()).to.have.a.lengthOf(1);

              const [error] = e.getErrors();

              expect(error.name).to.equal('JsonSchemaError');
              expect(error.keyword).to.equal('maxProperties');
              expect(error.dataPath).to.equal('.records');
            }
          });

          describe('dashUniqueIdentityId', () => {
            it('should no less than 32 bytes', async () => {
              rawUpdateConsensusParamsDocument.records = {
                dashUniqueIdentityId: crypto.randomBytes(30),
              };

              try {
                dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

                expect.fail('should throw error');
              } catch (e) {
                expect(e.name).to.equal('InvalidDocumentError');
                expect(e.getErrors()).to.have.a.lengthOf(1);

                const [error] = e.getErrors();

                expect(error.name).to.equal('JsonSchemaError');
                expect(error.keyword).to.equal('minItems');
                expect(error.dataPath).to.equal('.records.dashUniqueIdentityId');
              }
            });

            it('should no more than 32 bytes', async () => {
              rawUpdateConsensusParamsDocument.records = {
                dashUniqueIdentityId: crypto.randomBytes(64),
              };

              try {
                dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

                expect.fail('should throw error');
              } catch (e) {
                expect(e.name).to.equal('InvalidDocumentError');
                expect(e.getErrors()).to.have.a.lengthOf(1);

                const [error] = e.getErrors();

                expect(error.name).to.equal('JsonSchemaError');
                expect(error.keyword).to.equal('maxItems');
                expect(error.dataPath).to.equal('.records.dashUniqueIdentityId');
              }
            });
          });

          describe('dashAliasIdentityId', () => {
            it('should no less than 32 bytes', async () => {
              rawUpdateConsensusParamsDocument.records = {
                dashAliasIdentityId: crypto.randomBytes(30),
              };

              try {
                dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

                expect.fail('should throw error');
              } catch (e) {
                expect(e.name).to.equal('InvalidDocumentError');
                expect(e.getErrors()).to.have.a.lengthOf(1);

                const [error] = e.getErrors();

                expect(error.name).to.equal('JsonSchemaError');
                expect(error.keyword).to.equal('minItems');
                expect(error.dataPath).to.equal('.records.dashAliasIdentityId');
              }
            });

            it('should no more than 32 bytes', async () => {
              rawUpdateConsensusParamsDocument.records = {
                dashAliasIdentityId: crypto.randomBytes(64),
              };

              try {
                dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

                expect.fail('should throw error');
              } catch (e) {
                expect(e.name).to.equal('InvalidDocumentError');
                expect(e.getErrors()).to.have.a.lengthOf(1);

                const [error] = e.getErrors();

                expect(error.name).to.equal('JsonSchemaError');
                expect(error.keyword).to.equal('maxItems');
                expect(error.dataPath).to.equal('.records.dashAliasIdentityId');
              }
            });
          });
        });
      });

      describe('subdomainRules', () => {
        it('should be defined', async () => {
          delete rawUpdateConsensusParamsDocument.subdomainRules;

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('required');
            expect(error.params.missingProperty).to.equal('subdomainRules');
          }
        });

        it('should not have additional properties', async () => {
          rawUpdateConsensusParamsDocument.subdomainRules.someOtherProperty = 42;

          try {
            dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('additionalProperties');
            expect(error.dataPath).to.equal('.subdomainRules');
          }
        });

        describe('allowSubdomains', () => {
          it('should be boolean', async () => {
            rawUpdateConsensusParamsDocument.subdomainRules.allowSubdomains = 'data';

            try {
              dpp.document.create(dataContract, identityId, 'domain', rawUpdateConsensusParamsDocument);

              expect.fail('should throw error');
            } catch (e) {
              expect(e.name).to.equal('InvalidDocumentError');
              expect(e.getErrors()).to.have.a.lengthOf(1);

              const [error] = e.getErrors();

              expect(error.name).to.equal('JsonSchemaError');
              expect(error.keyword).to.equal('type');
              expect(error.dataPath).to.equal('.subdomainRules.allowSubdomains');
            }
          });
        });
      });
    });
  });
});
