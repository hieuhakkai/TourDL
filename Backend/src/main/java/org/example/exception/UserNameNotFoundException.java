package org.example.exception;

public class UserNameNotFoundException extends RuntimeException {
	public UserNameNotFoundException(String userNotFound) {
		super(userNotFound);
	}
}
