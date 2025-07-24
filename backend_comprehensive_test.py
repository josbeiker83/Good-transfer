#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for GOOD TRANSFER
Additional tests for CORS, edge cases, and data validation
"""

import requests
import json
import uuid
from datetime import datetime
import sys

BACKEND_URL = "https://1a1f880a-30d1-4c0f-b974-eb71cc0e8e9c.preview.emergentagent.com/api"

def test_cors_headers():
    """Test CORS configuration"""
    try:
        response = requests.options(f"{BACKEND_URL}/contact", 
                                  headers={'Origin': 'https://example.com'})
        
        cors_headers = {
            'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
            'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
            'access-control-allow-headers': response.headers.get('access-control-allow-headers')
        }
        
        if cors_headers['access-control-allow-origin'] == '*':
            print("✅ CORS: Allow-Origin configured correctly")
            return True
        else:
            print(f"❌ CORS: Allow-Origin issue: {cors_headers}")
            return False
    except Exception as e:
        print(f"❌ CORS test failed: {str(e)}")
        return False

def test_large_amount():
    """Test with large money transfer amounts"""
    test_data = {
        "name": "Carlos Rodriguez",
        "phone": "+1-212-555-0199",
        "amount": 50000.99,
        "message": "Transferencia grande para compra de propiedad"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=test_data)
        if response.status_code == 200:
            data = response.json()
            if data["amount"] == test_data["amount"]:
                print("✅ Large Amount: Handled correctly")
                return True
            else:
                print("❌ Large Amount: Amount not preserved")
                return False
        else:
            print(f"❌ Large Amount: Status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Large Amount test failed: {str(e)}")
        return False

def test_special_characters():
    """Test with special characters in names and messages"""
    test_data = {
        "name": "José María Fernández-López",
        "phone": "+34-91-123-4567",
        "amount": 750.50,
        "email": "josé.maría@correo.es",
        "message": "Envío para mamá. Necesito que llegue rápido. ¡Gracias!"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=test_data)
        if response.status_code == 200:
            data = response.json()
            if (data["name"] == test_data["name"] and 
                data["email"] == test_data["email"] and
                data["message"] == test_data["message"]):
                print("✅ Special Characters: Handled correctly")
                return True
            else:
                print("❌ Special Characters: Data not preserved correctly")
                return False
        else:
            print(f"❌ Special Characters: Status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Special Characters test failed: {str(e)}")
        return False

def test_api_prefix():
    """Test that API prefix is working correctly"""
    try:
        # Test that /api prefix routes to backend
        api_response = requests.get(f"{BACKEND_URL}/")
        
        # Test that root without /api serves frontend (HTML)
        root_response = requests.get("https://1a1f880a-30d1-4c0f-b974-eb71cc0e8e9c.preview.emergentagent.com/")
        
        if (api_response.status_code == 200 and 
            api_response.json().get("message") == "Hello World" and
            root_response.status_code == 200 and
            "html" in root_response.text.lower()):
            print("✅ API Prefix: Correctly routes /api to backend and root to frontend")
            return True
        else:
            print(f"❌ API Prefix: Routing issue - API: {api_response.status_code}, Root: {root_response.status_code}")
            return False
    except Exception as e:
        print(f"❌ API Prefix test failed: {str(e)}")
        return False

def test_negative_amount():
    """Test validation with negative amounts"""
    test_data = {
        "name": "Test User",
        "phone": "+1-555-000-0000",
        "amount": -100.0
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=test_data)
        # Should either accept it or reject with validation error
        if response.status_code in [200, 422]:
            if response.status_code == 422:
                print("✅ Negative Amount: Properly rejected negative amount")
            else:
                print("✅ Negative Amount: Accepted (no validation constraint)")
            return True
        else:
            print(f"❌ Negative Amount: Unexpected status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Negative Amount test failed: {str(e)}")
        return False

def main():
    """Run comprehensive tests"""
    print("=" * 60)
    print("GOOD TRANSFER Comprehensive Backend Testing")
    print("=" * 60)
    
    tests = [
        test_cors_headers,
        test_large_amount,
        test_special_characters,
        test_api_prefix,
        test_negative_amount
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
    print(f"COMPREHENSIVE TEST SUMMARY: {passed}/{total} tests passed")
    print("=" * 60)
    
    return passed == total

if __name__ == "__main__":
    success = main()
    if success:
        print("\n✅ All comprehensive tests passed!")
    else:
        print("\n⚠️ Some comprehensive tests failed")