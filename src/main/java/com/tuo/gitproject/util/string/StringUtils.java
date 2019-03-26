package com.tuo.gitproject.util.string;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;

import java.io.ByteArrayOutputStream;
import java.util.List;

public class StringUtils extends org.springframework.util.StringUtils {

	public final static String Empty = "";
	
	
	public static boolean isNotEmpty(Object str) {
		return !isEmpty(str);
	}
	
	public static String format(String pattern,Object...objs) {
		for (int i = 0; i < objs.length; i++) {
			Object obj = objs[i];
			String param = Empty;
			if(null != obj) 
				param = obj.toString();
			pattern = pattern.replaceAll("\\{"+i+"\\}", param);
		}
		return pattern;
	}
	
	public static String msgFormat(String pattern,Object...objs) {
		return java.text.MessageFormat.format(pattern, objs);		
	}
	
	public static String toString(Object obj) {
		if(isEmpty(obj))
			return null;
		return obj.toString();
	}
	
	public static boolean  isContainerArray(String[] vals , String val) {
		if(null == vals || vals.length == 0 || val == null) return false;
		for(String v : vals) {
			if(v.toLowerCase().trim().equals(val.toLowerCase().trim()))
				return true;
		}
		return false;
	}
	
	public static String toJSON(Object obj) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			return mapper.writeValueAsString(obj);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			if(obj instanceof List<?> || obj instanceof Object[])
				return "[]";
			else 
				return "{}";
		}
	}

//	public static String toMD5(String str) {
//        return new SimpleHash(Constants.HASHALGORITHMNAME, str,  ByteSource.Util.bytes(Constants.SALT), Constants.HASHITERATIONS).toString();
//	}
	
	private static char[] base64EncodeChars = new char[] { 'A', 'B', 'C', 'D',  
	        'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',  
	        'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',  
	        'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',  
	        'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3',  
	        '4', '5', '6', '7', '8', '9', '+', '/', };  
	  
	private static byte[] base64DecodeChars = new byte[] { -1, -1, -1, -1, -1,  
	        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  
	        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  
	        -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59,  
	        60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,  
	        10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1,  
	        -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,  
	        38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1,  
	        -1, -1 };
	
	/** 
	 * 解密 
	 * @param str 
	 * @return 
	 */  
	public static byte[] decode(String str) {  
	    byte[] data = str.getBytes();  
	    int len = data.length;  
	    ByteArrayOutputStream buf = new ByteArrayOutputStream(len);  
	    int i = 0;  
	    int b1, b2, b3, b4;  
	  
	    while (i < len) {  
	        do {  
	            b1 = base64DecodeChars[data[i++]];  
	        } while (i < len && b1 == -1);  
	        if (b1 == -1) {  
	            break;  
	        }  
	  
	        do {  
	            b2 = base64DecodeChars[data[i++]];  
	        } while (i < len && b2 == -1);  
	        if (b2 == -1) {  
	            break;  
	        }  
	        buf.write((int) ((b1 << 2) | ((b2 & 0x30) >>> 4)));  
	  
	        do {  
	            b3 = data[i++];  
	            if (b3 == 61) {  
	                return buf.toByteArray();  
	            }  
	            b3 = base64DecodeChars[b3];  
	        } while (i < len && b3 == -1);  
	        if (b3 == -1) {  
	            break;  
	        }  
	        buf.write((int) (((b2 & 0x0f) << 4) | ((b3 & 0x3c) >>> 2)));  
	  
	        do {  
	            b4 = data[i++];  
	            if (b4 == 61) {  
	                return buf.toByteArray();  
	            }  
	            b4 = base64DecodeChars[b4];  
	        } while (i < len && b4 == -1);  
	        if (b4 == -1) {  
	            break;  
	        }  
	        buf.write((int) (((b3 & 0x03) << 6) | b4));  
	    }  
	    return buf.toByteArray();  
	} 
}
