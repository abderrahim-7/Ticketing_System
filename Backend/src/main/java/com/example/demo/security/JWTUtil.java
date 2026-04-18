package com.example.demo.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JWTUtil {

   
    @Value("${jwt.secret}")
    private String secret;

    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    @Value("${jwt.expiration}")
    private long expiration;


    public String generateToken(String email){
        return Jwts.builder()
        .setSubject(email)
        .setExpiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(secretKey)
        .compact();
        
    }


    public String extractEmail(String token){
        return Jwts.parserBuilder()
        .setSigningKey(secretKey)
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
    }



    public boolean validateToken(String token , UserDetails userDetails) {
		final String Email = extractEmail(token);
		return (Email.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
	
	
	
	public boolean isTokenExpired(String token) {
		return Jwts.parserBuilder().setSigningKey(secretKey)
				.build()
				.parseClaimsJws(token)
				.getBody()
				.getExpiration()
				.before(new Date());

				
	}



}
