package com.tuo.gitproject.base.entity;

import java.io.Serializable;
import java.util.Date;

@SuppressWarnings("serial")
public class UnionPayReqEntity implements Serializable {

	/**
     * 主键
     */
    private String guid;

    /**
     * 消息ID，原样返回
     */
    private String msgId;

    /**
     * 消息来源
     */
    private String msgSrc;

    /**
     * 消息类型
     */
    private String msgType;

    /**
     * 报文请求时间，格式yyyy-MM-dd HH:mm:ss
     */
    private Date requestTimestamp;

    /**
     * 商户订单号
     */
    private String merOrderId;
	
    /**
     * 请求系统预留字段
     */
    private String srcReserve;

    /**
     * 商户号
     */
    private String mid;

    /**
     * 终端号
     */
    private String tid;

    /**
     * 业务类型
     */
    private String instMid;
	
    /**
     * 签名
     */
    private String sign;
    
    /**
     * 下单请求json数据
     */
    private String reqJson;
    
    

    /**
     * 主键
     * @return GUID 主键
     */
    public String getGuid() {
        return guid;
    }

    /**
     * 主键
     * @param guid 主键
     */
    public void setGuid(String guid) {
        this.guid = guid == null ? null : guid.trim();
    }

    /**
     * 消息ID，原样返回
     * @return MSG_ID 消息ID，原样返回
     */
    public String getMsgId() {
        return msgId;
    }

    /**
     * 消息ID，原样返回
     * @param msgId 消息ID，原样返回
     */
    public void setMsgId(String msgId) {
        this.msgId = msgId == null ? null : msgId.trim();
    }

    /**
     * 消息来源
     * @return MSG_SRC 消息来源
     */
    public String getMsgSrc() {
        return msgSrc;
    }

    /**
     * 消息来源
     * @param msgSrc 消息来源
     */
    public void setMsgSrc(String msgSrc) {
        this.msgSrc = msgSrc == null ? null : msgSrc.trim();
    }

    /**
     * 消息类型
     * @return MSG_TYPE 消息类型
     */
    public String getMsgType() {
        return msgType;
    }

    /**
     * 消息类型
     * @param msgType 消息类型
     */
    public void setMsgType(String msgType) {
        this.msgType = msgType == null ? null : msgType.trim();
    }

    /**
     * 报文请求时间，格式yyyy-MM-dd HH:mm:ss
     * @return REQUEST_TIMESTAMP 报文请求时间，格式yyyy-MM-dd HH:mm:ss
     */
    public Date getRequestTimestamp() {
        return requestTimestamp;
    }

    /**
     * 报文请求时间，格式yyyy-MM-dd HH:mm:ss
     * @param requestTimestamp 报文请求时间，格式yyyy-MM-dd HH:mm:ss
     */
    public void setRequestTimestamp(Date requestTimestamp) {
        this.requestTimestamp = requestTimestamp;
    }

    /**
     * 商户订单号
     * @return MER_ORDER_ID 商户订单号
     */
    public String getMerOrderId() {
        return merOrderId;
    }

    /**
     * 商户订单号
     * @param merOrderId 商户订单号
     */
    public void setMerOrderId(String merOrderId) {
        this.merOrderId = merOrderId == null ? null : merOrderId.trim();
    }

    /**
     * 请求系统预留字段
     * @return SRC_RESERVE 请求系统预留字段
     */
    public String getSrcReserve() {
        return srcReserve;
    }

    /**
     * 请求系统预留字段
     * @param srcReserve 请求系统预留字段
     */
    public void setSrcReserve(String srcReserve) {
        this.srcReserve = srcReserve == null ? null : srcReserve.trim();
    }

    /**
     * 商户号
     * @return MID 商户号
     */
    public String getMid() {
        return mid;
    }

    /**
     * 商户号
     * @param mid 商户号
     */
    public void setMid(String mid) {
        this.mid = mid == null ? null : mid.trim();
    }

    /**
     * 终端号
     * @return TID 终端号
     */
    public String getTid() {
        return tid;
    }

    /**
     * 终端号
     * @param tid 终端号
     */
    public void setTid(String tid) {
        this.tid = tid == null ? null : tid.trim();
    }

    /**
     * 业务类型
     * @return INST_MID 业务类型
     */
    public String getInstMid() {
        return instMid;
    }

    /**
     * 业务类型
     * @param instMid 业务类型
     */
    public void setInstMid(String instMid) {
        this.instMid = instMid == null ? null : instMid.trim();
    }

    /**
     * 签名
     * @return SIGN 签名
     */
    public String getSign() {
        return sign;
    }

    /**
     * 签名
     * @param sign 签名
     */
    public void setSign(String sign) {
        this.sign = sign == null ? null : sign.trim();
    }

    /**
     * 下单请求json数据
     * @return REQ_JSON 下单请求json数据
     */
    public String getReqJson() {
        return reqJson;
    }

    /**
     * 下单请求json数据
     * @param reqJson 下单请求json数据
     */
    public void setReqJson(String reqJson) {
        this.reqJson = reqJson == null ? null : reqJson.trim();
    }

}
