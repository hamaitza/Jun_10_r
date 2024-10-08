package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("")
    public List<User> list() {
        return userService.listAllUser();
    }
    
    @GetMapping("/user")
    public User get() { 
    	List<User> users = userService.listAllUser();
        return users.get(users.size() - 1);
    }
    
    @GetMapping("/nickname/{nickname}")
    public User get2(@PathVariable String nickname) { 
    	System.out.print(nickname);
    	List<User> users = userService.listAllUser();
    	for(int i = 0; i < users.size(); i++)
    		if(users.get(i).getNickname().equals(nickname)) {
    			
    			System.out.println("1");
    			return users.get(i);
    		}
    	return new User();
    }
    
    @GetMapping("/id/{id}")
    public ResponseEntity<User> get3(@PathVariable Integer id) {
        try {
            User user = userService.getUser(id);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody User user) {
    	List<User> users = userService.listAllUser();
    	for(int i = 0; i < users.size(); i++)
    		if(users.get(i).getNickname().equals(user.getNickname())) {
    			return new ResponseEntity<String>("nah", HttpStatus.OK);
    		}
    		else if(i == users.size() - 1) {
    			userService.saveUser(user);
    			return new ResponseEntity<String>("yes", HttpStatus.OK);
    		}
		return new ResponseEntity<String>("da", HttpStatus.OK);
    	
    }
    
    @PostMapping("/connect")
    public ResponseEntity<String> add2(@RequestBody User user) {
    	List<User> users = userService.listAllUser();
    	for(int i = 0; i < users.size(); i++)
    		if(users.get(i).getNickname().equals(user.getNickname()) && users.get(i).getPassword().equals(user.getPassword())) {
    			return new ResponseEntity<String>("yes", HttpStatus.OK);
    		}
    		else if(i == users.size() - 1) {
    			return new ResponseEntity<String>("nah", HttpStatus.OK);
    		}
		return new ResponseEntity<String>("da", HttpStatus.OK);
    	
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody User user, @PathVariable Integer id) {
        try {
            User existUser = userService.getUser(id);
            user.setId(id);            
            userService.saveUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {

        userService.deleteUser(id);
    }
}