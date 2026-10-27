import sys
from re import match
import json

VERSION = '1.0'
TOKENS1 = [ 'title', 'name', 'location', 'function' ]
# TOKENS1 = [ 'system', 'errors' ]
TOKENS2 = [ 'code' ]
TOKENS3 = [ 'entry', 'exit_success', 'exit_error' ]

def resetObj():
    obj = {
        'name': '',
        'title': '',
        'code': 0,
        'function': '',
        'entry': [],
        'exit_success': [],
        'exit_error': [],
        'level': [],
        'location': '',
        'system': False,
        'description': [],
        'errors': []
    }
    return obj


def main(infile: str, outfile: str) -> None:
    with open(infile, "r") as f:
        content = f.read().splitlines()

    buffer = []
    obj = resetObj()
    state = 0
    state_token = ''
    begin_li = True

    for line in content:
        if len(line) == 0 or line[0] == '#':
            continue

        line = line.strip()
        if state == 0:
            if ':' in line:
                token = line[:line.index(':')]
                if token in TOKENS1:
                    # print(f'Parse: {line}')
                    if m := match(r'(\w+): +"?([^"]*)"?', line):
                        # print(f'\tset obj[{m[1]}] = {m[2]}')
                        obj[m[1]] = m[2]

                elif token in TOKENS2:
                    # print(f'Parse: {line}')
                    if m := match(r'(\w+): +([0-9a-fA-Fx]+)', line):
                        radix = 16 if m[2].startswith('0x') else 10
                        obj[m[1]] = int(m[2], radix)
                elif token == 'description':
                    state = 1
                elif token in TOKENS3:
                    state = 2
                    state_token = token
                elif token == 'level':
                    if m := match(r'level: +\[ *([^\]]+) *\]', line):
                        levels = m[1].split(',')
                        for lvl in levels:
                            obj['level'].append(int(lvl))
                elif token == 'system':
                    obj['system'] = False if 'false' in line[7:] else True
                elif token == 'errors':
                    state = 3
                    state_token = token

        elif state == 1:
            if '{{' in line:
                idx = line.index('{{')
                line = line[idx+2:].strip()
            if '}}' in line:
                idx = line.index('}}')
                line = line[:idx].strip()
                state = 0
            if line.startswith('<li>'):
                if begin_li:
                    obj['description'].append('<ul>')
                    begin_li = False
                line += '</li>'
            else:
                if not begin_li:
                    obj['description'].append('</ul>')
                    begin_li = True

            obj['description'].append(line.strip())

        elif state == 2:
            if line == ']':
                state = 0
            elif m := match(r'(A|B|D|X|Y|U|S|CC): +"([^"]+)"', line):
                item = { 'name': m[1], 'description': m[2]}
                # print(f'\tappend obj[{state_token}]: {item}')
                obj[state_token].append(item)

        elif state == 3:
            if line == ']':
                state = 0
            elif m := match(r'L(\d): +(.*)', line):
                level = 'L' + m[1]
                errors = [ x.strip() for x in m[2].split(',') ]
                obj[state_token].append({ level: errors })

        if line.startswith('---'):
            # print(f"append object: {obj}")
            buffer.append(obj)
            obj = resetObj()
        pass

    with open(outfile, "w") as of:
        json.dump(buffer, of, indent=4)
        of.close()

    pass

if __name__ == "__main__":
    print(f"Database Generator V {VERSION}")
    if len(sys.argv) != 3:
        print("Missing argument")
        exit()

    infile = sys.argv[1]
    outfile = sys.argv[2]
    main(infile, outfile)
