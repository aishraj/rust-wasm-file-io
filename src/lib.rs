use std::os::raw::c_int;
use std::slice;

#[no_mangle]
pub extern "C" fn do_something(pointer: *mut u8, byte_size: usize)-> c_int {
    let buf = unsafe { slice::from_raw_parts_mut(pointer, byte_size)};
    let buf_size = buf.len();
    return buf_size as c_int;
}