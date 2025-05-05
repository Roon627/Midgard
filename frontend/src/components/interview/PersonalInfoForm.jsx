import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import StepTracker from "../common/StepTracker";
import nationalities from "../../data/countries.json";

const PersonalInfoForm = ({
  userInfo,
  setUserInfo,
  nationalitySearch,
  setNationalitySearch,
  showNationalityDropdown,
  setShowNationalityDropdown,
  filteredNationalities,
  alreadyApplied,
  error,
  idValidationInProgress,
  checkingApplication,
  handleIdentifierChange,
  handleStartInterview,
  checkPreviousApplication
}) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleStartInterview(); }}>
      {/* Reusable Step Tracker */}
      <StepTracker currentStep={1} />

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">First Name*</label>
          <input
            type="text"
            value={userInfo.firstName}
            onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
            className="form-control"
            placeholder="Enter your first name"
            required
            disabled={alreadyApplied}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Last Name*</label>
          <input
            type="text"
            value={userInfo.lastName}
            onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
            className="form-control"
            placeholder="Enter your last name"
            required
            disabled={alreadyApplied}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email Address*</label>
          <input
            type="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            className="form-control"
            placeholder="Enter your email"
            required
            disabled={alreadyApplied}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone Number</label>
          <div className="w-100">
            <PhoneInput
              country={
                nationalities.find(n => n.name === userInfo.nationality)?.code || 'mv'
              }
              value={userInfo.phone}
              onChange={(phone) => setUserInfo({ ...userInfo, phone })}
              containerClass="w-100"
              inputClass="form-control"
              inputStyle={{ width: "100%" }}
              buttonStyle={{ border: "1px solid #ced4da" }}
              disabled={alreadyApplied}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Nationality*</label>
          <div className="position-relative">
            <input
              type="text"
              value={nationalitySearch}
              onChange={(e) => {
                setNationalitySearch(e.target.value);
                setShowNationalityDropdown(true);
              }}
              onClick={() => setShowNationalityDropdown(true)}
              className="form-control"
              placeholder="Search nationality"
              required
              disabled={alreadyApplied}
            />
            {showNationalityDropdown && filteredNationalities.length > 0 && (
              <div
                className="position-absolute w-100 mt-1 border rounded bg-white z-index-dropdown"
                style={{ maxHeight: '200px', overflowY: 'auto', zIndex: 1000 }}
              >
                {filteredNationalities
                  .filter(nat =>
                    nat.name.toLowerCase().includes(nationalitySearch.toLowerCase())
                  )
                  .slice(0, 10)
                  .map((nat, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer hover-bg-light border-bottom"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setUserInfo(prev => ({
                          ...prev,
                          nationality: nat.name,
                          nationalId: "",
                          passport: ""
                        }));
                        setNationalitySearch(nat.name);
                        setShowNationalityDropdown(false);
                      }}
                    >
                      {nat.name}
                    </div>
                  ))}
              </div>
            )}
          </div>
          {userInfo.nationality && (
            <div className="form-text text-success">
              Selected: {userInfo.nationality}
            </div>
          )}
        </div>

        {userInfo.nationality === "Maldives" ? (
          <div className="col-md-6">
            <label className="form-label">National ID* (Must start with 'A')</label>
            <div className="input-group">
              <input
                type="text"
                value={userInfo.nationalId}
                onChange={(e) => handleIdentifierChange(e, 'nationalId')}
                className={`form-control ${alreadyApplied ? 'is-invalid' : userInfo.nationalId && !alreadyApplied && userInfo.nationalId.startsWith('A') ? 'is-valid' : ''}`}
                placeholder="Enter your National ID (A123456)"
                pattern="A.*"
                title="ID must start with letter A"
                required
                disabled={alreadyApplied}
              />
              {idValidationInProgress && (
                <span className="input-group-text">
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </span>
              )}
            </div>
            {alreadyApplied ? (
              <div className="invalid-feedback d-block">
                You have already applied for this position with this National ID.
                <div className="mt-3 text-center">
                  <a href="/careers" className="btn btn-outline-secondary btn-animated px-4">
                    ← Go back to Careers
                  </a>
                </div>
              </div>
            ) : (
              <small className="form-text text-muted">
                For Maldivian citizens, ID must start with 'A'
              </small>
            )}
          </div>
        ) : userInfo.nationality ? (
          <div className="col-md-6">
            <label className="form-label">Passport Number*</label>
            <div className="input-group">
              <input
                type="text"
                value={userInfo.passport}
                onChange={(e) => handleIdentifierChange(e, 'passport')}
                className={`form-control ${alreadyApplied ? 'is-invalid' : userInfo.passport && !alreadyApplied ? 'is-valid' : ''}`}
                placeholder="Enter your Passport Number"
                required
                disabled={alreadyApplied}
              />
              {idValidationInProgress && (
                <span className="input-group-text">
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </span>
              )}
            </div>
            {alreadyApplied && (
              <div className="invalid-feedback d-block">
                You have already applied for this position with this Passport Number.
                <div className="mt-3 text-center">
                  <a href="/careers" className="btn btn-outline-secondary btn-animated px-4">
                    ← Go back to Careers
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : null}

        <div className="col-md-6">
          <label className="form-label">Currently Employed?</label>
          <select
            value={userInfo.currentlyWorking}
            onChange={(e) => setUserInfo({ ...userInfo, currentlyWorking: e.target.value })}
            className="form-select"
            disabled={alreadyApplied}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      {error && !alreadyApplied && <div className="alert alert-danger mt-3">{error}</div>}

      <div className="d-grid mt-4">
        <button
          type="submit"
          className="btn btn-primary py-2"
          disabled={alreadyApplied || checkingApplication || idValidationInProgress}
        >
          {checkingApplication ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Checking application status...
            </>
          ) : (
            'Continue to Documents'
          )}
        </button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
