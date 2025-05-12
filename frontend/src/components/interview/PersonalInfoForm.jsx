import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import StepTracker from "../common/StepTracker";
import nationalities from "../../data/countries.json";
import { parsePhoneNumberFromString } from "libphonenumber-js";

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
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [idError, setIdError] = useState("");

  const selectedCountryCode = nationalities.find(n => n.name === userInfo.nationality)?.code || 'mv';

  const handlePhoneChange = (phone) => {
    const parsed = parsePhoneNumberFromString("+" + phone);
    const isValidLength =
      parsed &&
      parsed.nationalNumber &&
      parsed.nationalNumber.length >= 7 &&
      parsed.nationalNumber.length <= 15;

    if (parsed && parsed.isPossible() && isValidLength) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(false);
    }

    setUserInfo({ ...userInfo, phone });
  };

  const handleIdChange = (e, type) => {
    const value = e.target.value;
    setUserInfo(prev => ({ ...prev, [type]: value }));

    if (userInfo.nationality === "Maldives") {
      if (!/^A\d{6}$/.test(value)) {
        setIdError("Maldivian ID must start with 'A' followed by 6 digits (e.g. A123456).");
      } else {
        setIdError("");
      }
    } else {
      if (value.length > 15) {
        setIdError("Passport number should not exceed 15 characters.");
      } else {
        setIdError("");
      }
    }
  };

  const isFormValid = () => {
    return (
      userInfo.firstName &&
      userInfo.lastName &&
      userInfo.email &&
      userInfo.nationality &&
      isPhoneValid &&
      !idError &&
      (userInfo.nationalId || userInfo.passport)
    );
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (isFormValid()) handleStartInterview(); }}>
      <StepTracker currentStep={1} />

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">First Name*</label>
          <input
            id="firstName"
            name="firstName"
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
          <label htmlFor="lastName" className="form-label">Last Name*</label>
          <input
            id="lastName"
            name="lastName"
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
          <label htmlFor="email" className="form-label">Email Address*</label>
          <input
            id="email"
            name="email"
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
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <PhoneInput
            country={selectedCountryCode}
            value={userInfo.phone}
            onChange={handlePhoneChange}
            containerClass="w-100"
            inputProps={{ id: "phone", name: "phone" }}
            inputClass={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
            inputStyle={{ width: "100%" }}
            buttonStyle={{ border: "1px solid #ced4da" }}
            disabled={alreadyApplied}
          />
          {!isPhoneValid && (
            <div className="invalid-feedback d-block">
              Invalid phone number for selected country
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="nationality" className="form-label">Nationality*</label>
          <div className="position-relative">
            <input
              id="nationality"
              name="nationality"
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

        {alreadyApplied ? (
          <div className="col-md-6">
            <label htmlFor="readonly-id" className="form-label">National ID / Passport</label>
            <input id="readonly-id" name="readonly-id" type="text" className="form-control" value={userInfo.nationalId || userInfo.passport} disabled />
            <div className="alert alert-warning mt-2 rounded d-flex justify-content-between align-items-center">
              <span>You have already applied with this ID/Passport.</span>
              <a href="/careers" className="btn btn-outline-primary btn-sm">← Back to Careers</a>
            </div>
          </div>
        ) : userInfo.nationality === "Maldives" ? (
          <div className="col-md-6">
            <label htmlFor="nationalId" className="form-label">National ID* (e.g. A123456)</label>
            <input
              id="nationalId"
              name="nationalId"
              type="text"
              value={userInfo.nationalId}
              onChange={(e) => handleIdChange(e, 'nationalId')}
              className={`form-control ${idError ? 'is-invalid' : ''}`}
              placeholder="Enter your National ID"
              required
            />
            {idError && <div className="invalid-feedback d-block">{idError}</div>}
          </div>
        ) : userInfo.nationality ? (
          <div className="col-md-6">
            <label htmlFor="passport" className="form-label">Passport Number*</label>
            <input
              id="passport"
              name="passport"
              type="text"
              value={userInfo.passport}
              onChange={(e) => handleIdChange(e, 'passport')}
              className={`form-control ${idError ? 'is-invalid' : ''}`}
              placeholder="Enter your Passport Number"
              required
            />
            {idError && <div className="invalid-feedback d-block">{idError}</div>}
            {idValidationInProgress && !idError && (
              <div className="form-text text-primary mt-1 d-flex align-items-center">
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Validating Passport...
              </div>
            )}
          </div>
        ) : null}

        <div className="col-md-6">
          <label htmlFor="currentlyWorking" className="form-label">Currently Employed?</label>
          <select
            id="currentlyWorking"
            name="currentlyWorking"
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

      {!alreadyApplied && (
        <div className="d-grid mt-4">
          <button
            type="submit"
            className="btn btn-primary py-2"
            disabled={checkingApplication || idValidationInProgress || !isFormValid()}
          >
            Continue to Documents
          </button>
        </div>
      )}
    </form>
  );
};

export default PersonalInfoForm;
