import json
import urllib.request

url = 'https://api.github.com/users/zulkar-nain/repos?per_page=100'
req = urllib.request.Request(url, headers={'Accept': 'application/vnd.github+json', 'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as r:
    data = json.load(r)

for repo in data:
    print(repo['name'])
    print('---')
    print(repo.get('description') or '')
    print(repo.get('html_url') or '')
    print(repo.get('language') or '')
    print(repo.get('updated_at') or '')
    print()
