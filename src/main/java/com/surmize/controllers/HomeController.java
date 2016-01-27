package com.surmize.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping(value={"/", "/article/*"})
    public String index(){
        return "index";
    }

}
