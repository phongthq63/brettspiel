package com.brettspiel.utils;

import cn.hutool.core.util.StrUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by Quach Thanh Phong
 * On 4/25/2023 - 3:25 PM
 */
@Slf4j
@Component
public class RedisUtils {

    @Value("${spring.redis.prefix:#{''}}")
    private String prefix;

    @Autowired(required = false)
    private RedisTemplate<String, Object> redisTemplate;



    /**
     * Common cache fetch
     *
     * @param
     * @return
     */
    public boolean exists(String key) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            Boolean result = redisTemplate.hasKey(prefixKey);
            return result != null && result;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - get - {} | {}", prefixKey, e.getMessage());
            return false;
        }
    }

    /**
     * Common cache fetch
     * @param
     * @return
     */
    public Set<String> keys(String regex) {
        return regex == null || regex.isBlank() ? new HashSet<>() : redisTemplate.keys(StrUtil.format("{}.{}", this.prefix, regex));
    }

    /**
     *
     * @param key
     */
    public void incr(String key) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            redisTemplate.opsForValue().increment(key);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - incr - {} | {}", prefixKey, e.getMessage());
        }
    }
    public void incr(String key, Duration duration) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            redisTemplate.opsForValue().increment(key);
            redisTemplate.expire(key, duration);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - incr - {} | {}", prefixKey, e.getMessage());
        }
    }

    /**
     * Common cache fetch
     *
     * @param
     * @return
     */
    public Object get(String key) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForValue().get(prefixKey);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - get - {} | {}", prefixKey, e.getMessage());
            return null;
        }
    }

    /**
     * Common cache fetch
     *
     * @param
     * @return
     */
    public List<Object> multiget(List<String> keys) {
        if (keys.isEmpty()) {
            return new ArrayList<>();
        }
        List<String> prefixKeys = keys.stream()
                .map(key -> StrUtil.format("{}.{}", this.prefix, key))
                .collect(Collectors.toList());
        try {
            return redisTemplate.opsForValue().multiGet(prefixKeys);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - multiget - {} | {}", prefixKeys, e.getMessage());
            return new ArrayList<>();
        }
    }

    /**
     * Common cache fetch
     *
     * @param
     * @return
     */
    public void multiset(Map<String, ?> keyValueMap) {
        if (keyValueMap.isEmpty()) {
            return;
        }
        Map<String, Object> prefixKeys = keyValueMap.entrySet().stream()
                .collect(Collectors.toMap(entry -> StrUtil.format("{}.{}", this.prefix, entry.getKey()), Map.Entry::getValue));
        try {
            redisTemplate.opsForValue().multiSet(prefixKeys);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - multiset - {} | {}", prefixKeys, e.getMessage());
        }
    }
    public void multiset(Map<String, ?> keyValueMap, Duration duration) {
        if (keyValueMap.isEmpty()) {
            return;
        }
        Map<String, Object> prefixMap = keyValueMap.entrySet().stream()
                .collect(Collectors.toMap(entry -> StrUtil.format("{}.{}", this.prefix, entry.getKey()), Map.Entry::getValue));
        try {
            redisTemplate.multi();
            redisTemplate.opsForValue().multiSet(prefixMap);
            prefixMap.keySet().forEach(key -> redisTemplate.expire(key, duration));
            redisTemplate.exec();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - multiset - {} | {}", prefixMap, e.getMessage());
        }
    }

    /**
     * normal cache
     *
     * @param key
     * @param value
     * @return true success / false failure
     */
    public boolean set(String key, Object value) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            redisTemplate.opsForValue().set(prefixKey, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - set - {} {} | {}", prefixKey, value, e.getMessage());
            return false;
        }
    }

    /**
     * normal cache
     *
     * @param key
     * @param value
     * @return true success / false failure
     */
    public boolean set(String key, Object value, Duration duration) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            redisTemplate.opsForValue().set(prefixKey, value, duration);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - set - {} {} | {}", prefixKey, value, e.getMessage());
            return false;
        }
    }

    /**
     * delete cache
     *
     * @param key You can pass one value or more
     */
    public void del(String... key) {
        List<String> prefixKeys = Arrays.stream(key)
                .map(k -> StrUtil.format("{}.{}", this.prefix, k))
                .collect(Collectors.toList());
        try {
            if (key.length > 0) {
                if (key.length == 1) {
                    redisTemplate.delete(prefixKeys.get(0));
                } else {
                    redisTemplate.delete(prefixKeys);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - del - {} | {}", key, e.getMessage());
        }
    }



    /*-------------------------------------------------- MAP ---------------------------------------------------------*/

    /**
     * HashGet
     *
     * @param key  key cannot be null
     * @param item item cannot be null
     */
    public void hput(String key, String item, Object value) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            redisTemplate.opsForHash().put(prefixKey, item, value);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - hput - {} {} | {}", prefixKey, item, e.getMessage());
        }
    }

    /**
     * HashPut
     *
     * @param key  key cannot be null
     * @param item item cannot be null
     */
    public Object hget(String key, String item) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForHash().get(prefixKey, item);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - hget - {} {} | {}", prefixKey, item, e.getMessage());
            return null;
        }
    }

    /**
     * Get all key values corresponding to hashKey
     *
     * @param key
     * @return Corresponding multiple key values
     */
    public Map<Object, Object> hmget(String key) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForHash().entries(prefixKey);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - hmget - {} | {}", prefixKey, e.getMessage());
            return new HashMap<>();
        }
    }

    /**
     * HashSet
     *
     * @param key
     * @param map Corresponding to multiple key values
     */
    public boolean hmset(String key, Map<String, Object> map) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            redisTemplate.opsForHash().putAll(prefixKey, map);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - hmset - {} {} | {}", prefixKey, map, e.getMessage());
            return false;
        }
    }

    /**
     * delete the value in the hash table
     *
     * @param key  key cannot be null
     * @param item item can be multiple not null
     */
    public void hdel(String key, Object... item) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            redisTemplate.opsForHash().delete(prefixKey, item);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - hdel - {} {} | {}", prefixKey, item, e.getMessage());
        }
    }

    /**
     * Determine if there is a value for the item in the hash table
     *
     * @param key  key cannot be null
     * @param item item cannot be null
     * @return true exists false does not exist
     */
    public boolean hHasKey(String key, String item) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForHash().hasKey(prefixKey, item);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - hHasKey - {} {} | {}", prefixKey, item, e.getMessage());
            return false;
        }
    }



    /*-------------------------------------------------- SET ---------------------------------------------------------*/

    /**
     * Get all the values in the Set according to the key
     *
     * @param key 键
     */
    public Set<Object> sGet(String key) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForSet().members(prefixKey);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - sGet - {} | {}", prefixKey, e.getMessage());
            return null;
        }
    }

    /**
     * Put data into set cache
     *
     * @param key    key
     * @param values value can be multiple
     * @return Number of successes
     */
    public Long sPut(String key, Object... values) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForSet().add(prefixKey, values);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - sPut - {} {} | {}", prefixKey, values, e.getMessage());
            return 0L;
        }
    }

    /**
     * Set data into set cache
     *
     * @param key    key
     * @param values value can be multiple
     * @return Number of successes
     */
    public Long sSet(String key, Object... values) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            redisTemplate.delete(key);
            return redisTemplate.opsForSet().add(prefixKey, values);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - sSet - {} {} | {}", prefixKey, values, e.getMessage());
            return 0L;
        }
    }

    /**
     * Remove value with value
     *
     * @param key
     * @param values value can be multiple
     * @return removed
     */

    public Long sRemove(String key, Object... values) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForSet().remove(prefixKey, values);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - sRemove - {} {} | {}", prefixKey, values, e.getMessage());
            return 0L;
        }
    }

    /**
     * Get the length of the set cache
     *
     * @param key 键
     */
    public long sSize(String key) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForSet().size(prefixKey);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - sSize - {} | {}", prefixKey, e.getMessage());
            return 0;
        }
    }



    /*------------------------------------------------- ZSET ---------------------------------------------------------*/

    /**
     * Get top order start to end in sorted set
     *
     * @param key       key sorted set redis
     * @param rankStart index start rank (if < 0 -> revert index)
     * @param rankEnd   index end rank (if < 0 -> revert index)
     * @return
     */
    public Set<Object> zsRange(String key, long rankStart, long rankEnd) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForZSet().range(prefixKey, rankStart, rankEnd);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - zsRange - {} {} {} | {}", prefixKey, rankStart, rankEnd, e.getMessage());
            return new HashSet<>();
        }
    }

    /**
     * Get reverse top order start to end in sorted set
     *
     * @param key       key sorted set redis
     * @param rankStart index start rank (if < 0 -> revert index)
     * @param rankEnd   index end rank (if < 0 -> revert index)
     * @return
     */
    public Set<Object> zsReverseRange(String key, long rankStart, long rankEnd) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForZSet().reverseRange(prefixKey, rankStart, rankEnd);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - zsReverseRange - {} {} {} | {}", prefixKey, rankStart, rankEnd, e.getMessage());
            return new HashSet<>();
        }
    }

    /**
     * Get top order start to end in sorted set (have item and score)
     *
     * @param key       key sorted set redis
     * @param rankStart index start rank (if < 0 -> revert index)
     * @param rankEnd   index end rank (if < 0 -> revert index)
     * @return
     */
    public Set<ZSetOperations.TypedTuple<Object>> zsRangeWithScores(String key, long rankStart, long rankEnd) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForZSet().rangeWithScores(prefixKey, rankStart, rankEnd);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - zsRangeWithScores - {} {} {} | {}", prefixKey, rankStart, rankEnd, e.getMessage());
            return new HashSet<>();
        }
    }

    /**
     * Get reverse top order start to end in sorted set (have item and score)
     *
     * @param key       key sorted set redis
     * @param rankStart index start rank (if < 0 -> revert index)
     * @param rankEnd   index end rank (if < 0 -> revert index)
     * @return
     */
    public Set<ZSetOperations.TypedTuple<Object>> zsReverseRangeWithScores(String key, long rankStart, long rankEnd) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForZSet().reverseRangeWithScores(prefixKey, rankStart, rankEnd);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - zsRangeWithScores - {} {} {} | {}", prefixKey, rankStart, rankEnd, e.getMessage());
            return new HashSet<>();
        }
    }

    /**
     * Add or Update if exsist
     *
     * @param key    key sorted set redis
     * @param values
     * @param score  score <-> rank order
     * @return
     */
    public boolean zsAdd(String key, Object values, double score) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            redisTemplate.opsForZSet().add(prefixKey, values, score);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - zsAdd - {} {} {} | {}", prefixKey, values, score, e.getMessage());
            return false;
        }
    }

    /**
     * Update score if exsist
     *
     * @param key    key sorted set redis
     * @param values
     * @param score  score <-> rank order
     * @return
     */
    public Double zsIncrementScore(String key, Object values, double score) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForZSet().incrementScore(prefixKey, values, score);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - zsIncrement - {} {} {} | {}", prefixKey, values, score, e.getMessage());
            return null;
        }
    }

    /**
     * Get score
     *
     * @param key    key sorted set redis
     * @param values
     * @return
     */
    public Double zsScore(String key, Object values) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForZSet().score(prefixKey, values);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - zsScore - {} {} | {}", prefixKey, values, e.getMessage());
            return null;
        }
    }

    /**
     * Get size sorted set
     *
     * @param key key sorted set redis
     * @return
     */
    public Long zsCard(String key) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForZSet().zCard(prefixKey);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - zsCard - {} | {}", prefixKey, e.getMessage());
            return null;
        }
    }

    /**
     * Remove sorted set element by element
     *
     * @param key key sorted set redis
     * @return count element remove
     */
    public Long zsRemove(String key, Object values) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForZSet().remove(prefixKey, values);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - zsRemove - {} {} | {}", prefixKey, values, e.getMessage());
            return 0L;
        }
    }

    /**
     * Remove sorted set element by rank
     *
     * @param key key sorted set redis
     * @return count element remove
     */
    public Long zsRemoveRange(String key, long rankStart, long rankEnd) {
        String prefixKey = StrUtil.format("{}.{}", this.prefix, key);
        try {
            return redisTemplate.opsForZSet().removeRange(prefixKey, rankStart, rankEnd);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("RedisUtils - zsRemoveRange - {} {} {} | {}", prefixKey, rankStart, rankEnd, e.getMessage());
            return 0L;
        }
    }

}
