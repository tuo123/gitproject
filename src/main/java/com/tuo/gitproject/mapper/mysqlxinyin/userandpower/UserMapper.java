package com.tuo.gitproject.mapper.mysqlxinyin.userandpower;

import com.tuo.gitproject.entity.xtsz.User;

/**
 * 用户Mapp
 */
public interface UserMapper {

    User findByUsername(String username);
}
