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
          enableAtHeight: 42,
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
          expect(error.params.missingProperty).to.equal('enableAtHeight');
        }
      });

      it('should not have additional properties', async () => {
        rawUpdateConsensusParamsDocument.someOtherProperty = 42;

        try {
          dpp.document.create(dataContract, identityId, 'updateConsensusParams', rawUpdateConsensusParamsDocument);

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

      describe('enabledAtHeight', () => {
        it('should be present', async () => {
          delete rawUpdateConsensusParamsDocument.enableAtHeight;

          try {
            dpp.document.create(dataContract, identityId, 'updateConsensusParams', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('required');
            expect(error.params.missingProperty).to.equal('enableAtHeight');
          }
        });

        it('should be integer', () => {
          rawUpdateConsensusParamsDocument.enableAtHeight = 'string';

          try {
            dpp.document.create(dataContract, identityId, 'updateConsensusParams', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('type');
            expect(error.params.type).to.equal('integer');
          }
        });

        it('should be at least 1', () => {
          rawUpdateConsensusParamsDocument.enableAtHeight = 0;

          try {
            dpp.document.create(dataContract, identityId, 'updateConsensusParams', rawUpdateConsensusParamsDocument);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('minimum');
            expect(error.params.limit).to.equal(1);
          }
        });
      });

      it('should be valid', async () => {
        const updateConsensusParams = dpp.document.create(dataContract, identityId, 'updateConsensusParams', rawUpdateConsensusParamsDocument);

        const result = await dpp.document.validate(updateConsensusParams);

        expect(result.isValid()).to.be.true();
      });
    });

    describe('fixCumulativeFeesBug', () => {
      let rawFixCumulativeFeesBug;

      beforeEach(() => {
        rawFixCumulativeFeesBug = {
          enabled: true,
          enableAtHeight: 42,
        };
      });

      it('should have at least one property', () => {
        rawFixCumulativeFeesBug = {};

        try {
          dpp.document.create(dataContract, identityId, 'fixCumulativeFeesBug', rawFixCumulativeFeesBug);

          expect.fail('should throw error');
        } catch (e) {
          expect(e.name).to.equal('InvalidDocumentError');
          expect(e.getErrors()).to.have.a.lengthOf(1);

          const [error] = e.getErrors();

          expect(error.name).to.equal('JsonSchemaError');
          expect(error.keyword).to.equal('required');
          expect(error.params.missingProperty).to.equal('enabled');
        }
      });

      it('should not have additional properties', async () => {
        rawFixCumulativeFeesBug.someOtherProperty = 42;

        try {
          dpp.document.create(dataContract, identityId, 'fixCumulativeFeesBug', rawFixCumulativeFeesBug);

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

      describe('enabled', () => {
        it('should be present', async () => {
          delete rawFixCumulativeFeesBug.enabled;

          try {
            dpp.document.create(dataContract, identityId, 'fixCumulativeFeesBug', rawFixCumulativeFeesBug);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('required');
            expect(error.params.missingProperty).to.equal('enabled');
          }
        });

        it('should be boolean', () => {
          rawFixCumulativeFeesBug.enabled = 'string';

          try {
            dpp.document.create(dataContract, identityId, 'fixCumulativeFeesBug', rawFixCumulativeFeesBug);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('type');
            expect(error.params.type).to.equal('boolean');
          }
        });
      });

      describe('enabledAtHeight', () => {
        it('should be present', async () => {
          delete rawFixCumulativeFeesBug.enableAtHeight;

          try {
            dpp.document.create(dataContract, identityId, 'fixCumulativeFeesBug', rawFixCumulativeFeesBug);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('required');
            expect(error.params.missingProperty).to.equal('enableAtHeight');
          }
        });

        it('should be integer', () => {
          rawFixCumulativeFeesBug.enableAtHeight = 'string';

          try {
            dpp.document.create(dataContract, identityId, 'fixCumulativeFeesBug', rawFixCumulativeFeesBug);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('type');
            expect(error.params.type).to.equal('integer');
          }
        });

        it('should be at least 1', () => {
          rawFixCumulativeFeesBug.enableAtHeight = 0;

          try {
            dpp.document.create(dataContract, identityId, 'fixCumulativeFeesBug', rawFixCumulativeFeesBug);

            expect.fail('should throw error');
          } catch (e) {
            expect(e.name).to.equal('InvalidDocumentError');
            expect(e.getErrors()).to.have.a.lengthOf(1);

            const [error] = e.getErrors();

            expect(error.name).to.equal('JsonSchemaError');
            expect(error.keyword).to.equal('minimum');
            expect(error.params.limit).to.equal(1);
          }
        });
      });

      it('should be valid', async () => {
        const fixCumulativeFeesBug = dpp.document.create(dataContract, identityId, 'fixCumulativeFeesBug', rawFixCumulativeFeesBug);

        const result = await dpp.document.validate(fixCumulativeFeesBug);

        expect(result.isValid()).to.be.true();
      });
    });
  });
});
