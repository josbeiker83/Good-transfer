#!/usr/bin/env python3
"""
Backend API Testing for GOOD TRANSFER Money Transfer Service
Tests Contact Form API endpoints and data validation
"""

import requests
import json
import uuid
from datetime import datetime
import sys
import os

# Get backend URL from frontend environment
BACKEND_URL = "https://31396ccf-2e42-476d-9162-9d7229558fa0.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.test_results = []
        self.created_contact_ids = []
        
    def log_test(self, test_name, success, message="", data=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        self.test_results.append({
            "test": test_name,
            "success": success,
            "message": message,
            "data": data
        })
        
    def test_root_endpoint(self):
        """Test the root API endpoint"""
        try:
            response = requests.get(f"{self.base_url}/")
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("Root Endpoint", True, "Root endpoint accessible")
                    return True
                else:
                    self.log_test("Root Endpoint", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Root Endpoint", False, f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Root Endpoint", False, f"Connection error: {str(e)}")
            return False
    
    def test_create_contact_form_valid(self):
        """Test creating contact form with valid data"""
        test_data = {
            "name": "Juan Pérez",
            "phone": "+1-347-864-6398",
            "amount": 1000.0,
            "email": "juan.perez@email.com",
            "message": "Necesito enviar dinero a mi familia en Colombia urgentemente"
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=test_data)
            if response.status_code == 200:
                data = response.json()
                
                # Validate response structure
                required_fields = ["id", "name", "phone", "amount", "timestamp", "status"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test("Create Contact Form - Valid Data", False, 
                                f"Missing fields: {missing_fields}")
                    return False
                
                # Validate data integrity
                if (data["name"] == test_data["name"] and 
                    data["phone"] == test_data["phone"] and
                    data["amount"] == test_data["amount"] and
                    data["email"] == test_data["email"] and
                    data["message"] == test_data["message"]):
                    
                    # Store ID for later tests
                    self.created_contact_ids.append(data["id"])
                    
                    # Validate UUID format
                    try:
                        uuid.UUID(data["id"])
                        uuid_valid = True
                    except ValueError:
                        uuid_valid = False
                    
                    # Validate timestamp format
                    try:
                        datetime.fromisoformat(data["timestamp"].replace('Z', '+00:00'))
                        timestamp_valid = True
                    except ValueError:
                        timestamp_valid = False
                    
                    if uuid_valid and timestamp_valid:
                        self.log_test("Create Contact Form - Valid Data", True, 
                                    f"Contact form created successfully with ID: {data['id']}")
                        return True
                    else:
                        self.log_test("Create Contact Form - Valid Data", False, 
                                    f"Invalid UUID or timestamp format")
                        return False
                else:
                    self.log_test("Create Contact Form - Valid Data", False, 
                                "Response data doesn't match input data")
                    return False
            else:
                self.log_test("Create Contact Form - Valid Data", False, 
                            f"Status code: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("Create Contact Form - Valid Data", False, f"Error: {str(e)}")
            return False
    
    def test_create_contact_form_minimal(self):
        """Test creating contact form with minimal required data"""
        test_data = {
            "name": "María González",
            "phone": "+1-555-123-4567",
            "amount": 500.0
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=test_data)
            if response.status_code == 200:
                data = response.json()
                
                # Validate required fields are present
                if (data["name"] == test_data["name"] and 
                    data["phone"] == test_data["phone"] and
                    data["amount"] == test_data["amount"] and
                    data.get("email") is None and
                    data.get("message") is None):
                    
                    self.created_contact_ids.append(data["id"])
                    self.log_test("Create Contact Form - Minimal Data", True, 
                                f"Contact form created with minimal data, ID: {data['id']}")
                    return True
                else:
                    self.log_test("Create Contact Form - Minimal Data", False, 
                                "Response data doesn't match input or optional fields not handled correctly")
                    return False
            else:
                self.log_test("Create Contact Form - Minimal Data", False, 
                            f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Create Contact Form - Minimal Data", False, f"Error: {str(e)}")
            return False
    
    def test_create_contact_form_invalid(self):
        """Test creating contact form with invalid/missing data"""
        # Test missing required field
        invalid_data = {
            "name": "Test User",
            "phone": "+1-555-999-8888"
            # Missing amount
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=invalid_data)
            if response.status_code == 422:  # Validation error
                self.log_test("Create Contact Form - Invalid Data", True, 
                            "Properly rejected request with missing required field")
                return True
            else:
                self.log_test("Create Contact Form - Invalid Data", False, 
                            f"Expected 422 validation error, got: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Create Contact Form - Invalid Data", False, f"Error: {str(e)}")
            return False
    
    def test_get_all_contact_forms(self):
        """Test retrieving all contact forms"""
        try:
            response = requests.get(f"{self.base_url}/contact")
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    # Check if our created contacts are in the list
                    found_contacts = 0
                    for contact_id in self.created_contact_ids:
                        for contact in data:
                            if contact.get("id") == contact_id:
                                found_contacts += 1
                                break
                    
                    if found_contacts == len(self.created_contact_ids):
                        self.log_test("Get All Contact Forms", True, 
                                    f"Retrieved {len(data)} contact forms, all created contacts found")
                        return True
                    else:
                        self.log_test("Get All Contact Forms", False, 
                                    f"Not all created contacts found in response")
                        return False
                else:
                    self.log_test("Get All Contact Forms", False, 
                                "Response is not a list")
                    return False
            else:
                self.log_test("Get All Contact Forms", False, 
                            f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get All Contact Forms", False, f"Error: {str(e)}")
            return False
    
    def test_get_contact_form_by_id(self):
        """Test retrieving specific contact form by ID"""
        if not self.created_contact_ids:
            self.log_test("Get Contact Form by ID", False, "No contact IDs available for testing")
            return False
        
        contact_id = self.created_contact_ids[0]
        
        try:
            response = requests.get(f"{self.base_url}/contact/{contact_id}")
            if response.status_code == 200:
                data = response.json()
                
                if data.get("id") == contact_id:
                    self.log_test("Get Contact Form by ID", True, 
                                f"Successfully retrieved contact form with ID: {contact_id}")
                    return True
                else:
                    self.log_test("Get Contact Form by ID", False, 
                                f"Retrieved contact ID doesn't match requested ID")
                    return False
            else:
                self.log_test("Get Contact Form by ID", False, 
                            f"Status code: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get Contact Form by ID", False, f"Error: {str(e)}")
            return False
    
    def test_get_contact_form_invalid_id(self):
        """Test retrieving contact form with invalid ID"""
        invalid_id = str(uuid.uuid4())  # Valid UUID format but doesn't exist
        
        try:
            response = requests.get(f"{self.base_url}/contact/{invalid_id}")
            if response.status_code == 404:
                self.log_test("Get Contact Form - Invalid ID", True, 
                            "Properly returned 404 for non-existent contact form")
                return True
            else:
                self.log_test("Get Contact Form - Invalid ID", False, 
                            f"Expected 404, got: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get Contact Form - Invalid ID", False, f"Error: {str(e)}")
            return False
    
    def test_data_persistence(self):
        """Test that data persists across requests"""
        if not self.created_contact_ids:
            self.log_test("Data Persistence", False, "No contact IDs available for testing")
            return False
        
        # Get the contact form twice and compare
        contact_id = self.created_contact_ids[0]
        
        try:
            response1 = requests.get(f"{self.base_url}/contact/{contact_id}")
            response2 = requests.get(f"{self.base_url}/contact/{contact_id}")
            
            if response1.status_code == 200 and response2.status_code == 200:
                data1 = response1.json()
                data2 = response2.json()
                
                if data1 == data2:
                    self.log_test("Data Persistence", True, 
                                "Contact form data is consistent across requests")
                    return True
                else:
                    self.log_test("Data Persistence", False, 
                                "Contact form data is inconsistent across requests")
                    return False
            else:
                self.log_test("Data Persistence", False, 
                            "Failed to retrieve contact form for persistence test")
                return False
        except Exception as e:
            self.log_test("Data Persistence", False, f"Error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 60)
        print("GOOD TRANSFER Backend API Testing")
        print("=" * 60)
        print(f"Testing backend URL: {self.base_url}")
        print()
        
        tests = [
            self.test_root_endpoint,
            self.test_create_contact_form_valid,
            self.test_create_contact_form_minimal,
            self.test_create_contact_form_invalid,
            self.test_get_all_contact_forms,
            self.test_get_contact_form_by_id,
            self.test_get_contact_form_invalid_id,
            self.test_data_persistence
        ]
        
        passed = 0
        total = len(tests)
        
        for test in tests:
            try:
                if test():
                    passed += 1
            except Exception as e:
                print(f"❌ FAIL {test.__name__}: Unexpected error: {str(e)}")
        
        print()
        print("=" * 60)
        print(f"TEST SUMMARY: {passed}/{total} tests passed")
        print("=" * 60)
        
        if passed == total:
            print("🎉 All backend tests passed!")
            return True
        else:
            print(f"⚠️  {total - passed} tests failed")
            return False

def main():
    """Main test execution"""
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n✅ Backend API is working correctly")
        sys.exit(0)
    else:
        print("\n❌ Backend API has issues")
        sys.exit(1)

if __name__ == "__main__":
    main()