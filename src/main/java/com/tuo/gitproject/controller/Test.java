package com.tuo.gitproject.controller;

import com.tuo.gitproject.mapper.mysqltuo.fileoperation.FileOperationMapper;
import com.tuo.gitproject.mapper.mysqlxinyin.test.TestMapper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@Api
public class Test {
    @Autowired
    private FileOperationMapper fileOperationMapper;
    @Autowired
    private TestMapper testMapper;

    @PostMapping(value = "testPost")
    @ApiOperation("测试")
    public List testPost(){
        List list = new ArrayList();
        list.add(fileOperationMapper.selectByPrimaryKey(new HashMap()));
        list.add(testMapper.selectByPrimaryKey(new HashMap()));
        return list;

    }



}
